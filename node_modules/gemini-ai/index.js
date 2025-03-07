const fileTypeFromBuffer = (arrayBuffer) => {
	const uint8arr = new Uint8Array(arrayBuffer);

	const len = 4;
	if (uint8arr.length >= len) {
		const signatureArr = new Array(len);
		for (let i = 0; i < len; i++)
			signatureArr[i] = new Uint8Array(arrayBuffer)[i].toString(16);
		const signature = signatureArr.join("").toUpperCase();
		switch (signature) {
			case "89504E47":
				return "image/png";
			case "47494638":
				return "image/gif";
			case "FFD8FFDB":
			case "FFD8FFE0":
				return "image/jpeg";
			default:
				throw new Error(
					"Unknown file type. Please provide a .png, .gif, or .jpeg/.jpg file.",
				);
		}
	}
	throw new Error(
		"Unknown file type. Please provide a .png, .gif, or .jpeg/.jpg file.",
	);
};

const answerPairToParameter = (message) => {
	if (message.length !== 2) {
		throw new Error(
			"Message format must be an array of [user, model] pairs. See docs for more information.",
		);
	}
	return [
		{
			parts: [{ text: message[0] }],
			role: "user",
		},
		{
			parts: [{ text: message[1] }],
			role: "model",
		},
	];
};

export default class Gemini {
	#fetch;
	#dispatcher;

	static JSON = "json";
	static TEXT = "markdown";

	constructor(key, rawConfig = {}) {
		let defaultFetch;

		try {
			defaultFetch = fetch;
		} catch {}

		const config = this.#parseConfig(rawConfig, {
			fetch: defaultFetch,
			dispatcher: undefined,
		});

		if (!config.fetch)
			throw new Error(
				"Fetch was not found in environment, and no polyfill was provided. Please install a polyfill, and put it in the `fetch` property of the Gemini configuration.",
			);

		this.#fetch = config.fetch;
		this.key = key;
		this.#dispatcher = config.dispatcher;
	}

	#parseConfig(raw = {}, defaults = {}) {
		const extras = Object.keys(raw).filter(
			(item) => !Object.keys(defaults).includes(item),
		);
		if (extras.length)
			throw new Error(
				`These following configurations are not available on this function: ${extras.join(
					", ",
				)}`,
			);
		return { ...defaults, ...raw };
	}

	#switchFormat(format, response) {
		switch (format) {
			case Gemini.TEXT:
				return response.candidates[0].content.parts[0].text;
			case Gemini.JSON:
				return response;
			default:
				throw new Error(
					`${config.format} is not a valid format. Use Gemini.TEXT or Gemini.JSON.`,
				);
		}
	}

	async #query(model, command, body) {
		const opts = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
			dispatcher: this.#dispatcher,
		};

		const response = await this.#fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/${model}:${command}?key=${this.key}`,
			opts,
		);

		if (!response.ok) {
			throw new Error(
				`There was an HTTP error when fetching Gemini. HTTP status: ${response.status}`,
			);
		}

		return response;
	}

	async #queryJSON(model, command, body) {
		const response = await this.#query(model, command, body);

		const json = await response.json();
		if (!response.ok)
			throw new Error(
				`An error occurred when fetching Gemini: \n${json.error.message}`,
			);

		return json;
	}

	async #queryStream(model, command, body, callback) {
		const response = await this.#query(model, command, body);

		const reader = response.body.getReader();
		const decoder = new TextDecoder("utf-8");

		let jsonString = "";
		let json;

		await reader.read().then(function processText({ done, value }) {
			if (done) {
				return;
			}

			jsonString += decoder.decode(value, { stream: true });

			try {
				const parsedJSON = JSON.parse(`${jsonString}]`);
				json = { ...json, ...parsedJSON[parsedJSON.length - 1] };
				callback(json);
			} catch {}

			return reader.read().then(processText);
		});
	}

	async ask(message, rawConfig = {}) {
		const config = this.#parseConfig(rawConfig, {
			temperature: 1,
			topP: 0.8,
			topK: 10,
			format: Gemini.TEXT,
			maxOutputTokens: 800,
			model: undefined,
			data: [],
			messages: [],
			stream: undefined,
		});

		const body = {
			contents: [
				...config.messages.flatMap(answerPairToParameter),
				{
					parts: [{ text: message }],
					role: "user",
				},
			],
			generationConfig: {
				temperature: config.temperature,
				maxOutputTokens: config.maxOutputTokens,
				topP: config.topP,
				topK: config.topK,
			},
		};

		if (config.data.length) {
			for (const data of config.data) {
				body.contents.at(-1).parts.push({
					inline_data: {
						mime_type: fileTypeFromBuffer(data),
						data: data.toString("base64"),
					},
				});
			}
		}

		if (config.stream) {
			let finalJSON = undefined;

			await this.#queryStream(
				config.model ||
					(config.data.length ? "gemini-pro-vision" : "gemini-pro"),
				"streamGenerateContent",
				body,
				(streamContent) => {
					if (!finalJSON) finalJSON = streamContent;
					else
						finalJSON.candidates[0].content.parts[0].text +=
							streamContent.candidates[0].content.parts[0].text;

					if (streamContent.promptFeedback.blockReason) {
						throw new Error(
							`Your prompt was blocked by Google. Here is Gemini's feedback: \n${JSON.stringify(
								response.promptFeedback,
								null,
								4,
							)}`,
						);
					}

					config.stream(this.#switchFormat(config.format, streamContent));
				},
			);

			return this.#switchFormat(config.format, finalJSON);
		}

		const response = await this.#queryJSON(
			config.model || (config.data.length ? "gemini-pro-vision" : "gemini-pro"),
			"generateContent",
			body,
		);

		if (response.promptFeedback.blockReason) {
			throw new Error(
				`Your prompt was blocked by Google. Here is Gemini's feedback: \n${JSON.stringify(
					response.promptFeedback,
					null,
					4,
				)}`,
			);
		}

		return this.#switchFormat(config.format, response);
	}

	async count(message, rawConfig = {}) {
		const config = this.#parseConfig(rawConfig, {
			model: "gemini-pro",
		});

		const body = {
			contents: [
				{
					parts: [{ text: message }],
					role: "user",
				},
			],
		};

		const response = await this.#queryJSON(config.model, "countTokens", body);

		return response.totalTokens;
	}

	async embed(message, rawConfig = {}) {
		const config = this.#parseConfig(rawConfig, {
			model: "embedding-001",
		});

		const body = {
			model: `models/${config.model}`,
			content: {
				parts: [{ text: message }],
				role: "user",
			},
		};

		const response = await this.#queryJSON(config.model, "embedContent", body);

		return response.embedding.values;
	}

	createChat(rawChatConfig) {
		class Chat {
			constructor(gemini, rawConfig = {}) {
				this.gemini = gemini;
				this.config = this.gemini.#parseConfig(rawConfig, {
					messages: [],
					temperature: 1,
					topP: 0.8,
					topK: 10,
					model: "gemini-pro",
					maxOutputTokens: 800,
				});
				this.messages = this.config.messages.flatMap(answerPairToParameter);
			}

			async ask(message, rawConfig) {
				const config = {
					...this.config,
					...this.gemini.#parseConfig(rawConfig, {
						format: Gemini.TEXT,
						data: [],
						stream: undefined,
					}),
				};

				if (this.messages.at(-1)?.role === "user") {
					throw new Error(
						"Please ensure you are running chat commands asynchronously. You cannot send 2 messages at the same time in the same chat. Use standard Gemini.ask() for this.",
					);
				}

				const currentMessage = {
					parts: [{ text: message }],
					role: "user",
				};

				if (config.data.length) {
					try {
						this.config.model = "gemini-pro-vision";
						for (const data of config.data) {
							currentMessage.parts.push({
								inline_data: {
									mime_type: fileTypeFromBuffer(data).mime,
									data: data.toString("base64"),
								},
							});
						}
					} catch {
						console.error(
							"It is currently not supported by Google to use non-text data with the chat function.",
						);
					}
				}

				this.messages.push(currentMessage);

				const body = {
					contents: [this.messages],
					generationConfig: {
						temperature: config.temperature,
						maxOutputTokens: config.maxOutputTokens,
						topP: config.topP,
						topK: config.topK,
					},
				};

				if (config.stream) {
					let finalJSON = {};

					await this.gemini.#queryStream(
						config.model ||
							(config.data.length ? "gemini-pro-vision" : "gemini-pro"),
						"streamGenerateContent",
						body,
						(streamContent) => {
							finalJSON = streamContent;

							if (streamContent.promptFeedback?.blockReason) {
								this.messages.pop();
								throw new Error(
									`Your prompt was blocked by Google. Here is Gemini's feedback: \n${JSON.stringify(
										response.promptFeedback,
										null,
										4,
									)}`,
								);
							}

							config.stream(
								this.gemini.#switchFormat(config.format, streamContent),
							);
						},
					);

					this.messages.push(finalJSON.candidates[0].content);

					return this.gemini.#switchFormat(config.format, finalJSON);
				}
				const response = await this.gemini.#queryJSON(
					config.model ||
						(config.data.length ? "gemini-pro-vision" : "gemini-pro"),
					"generateContent",
					body,
				);

				if (response.promptFeedback?.blockReason) {
					this.messages.pop();
					throw new Error(
						`Your prompt was blocked by Google. Here is Gemini's feedback: \n${JSON.stringify(
							response.promptFeedback,
							null,
							4,
						)}`,
					);
				}

				this.messages.push(response.candidates[0].content);

				return this.gemini.#switchFormat(config.format, response);
			}
		}

		return new Chat(this, rawChatConfig);
	}
}
