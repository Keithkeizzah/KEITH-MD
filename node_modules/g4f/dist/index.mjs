// src/handlers/ChatCompletionHandler.ts
import { Signale } from "signale";

// src/util/util.ts
import { Readable } from "stream";

// src/Providers/ChatCompletion/GPT.ts
import axios from "axios";

// src/util/stream.ts
function handleStream(response, stream, responseFunc) {
  if (!stream)
    return responseFunc(response.data);
  return response;
}
async function* chunkProcessor(response) {
  let previousText = "";
  let text = "";
  let sliceText = null;
  const isPostprocessing = response.name == "post_process";
  let provider = isPostprocessing ? null : providers[response.name];
  for await (const chunk of response.data) {
    text = chunk.toString("utf-8");
    if (provider)
      text = provider.handleResponse(text);
    if (!text)
      continue;
    if (previousText == text)
      continue;
    if (provider && provider.need_slice_text)
      sliceText = text.slice(previousText.length);
    previousText = text;
    if (text && text.length != 0)
      yield sliceText || text;
  }
}

// src/Providers/ChatCompletion/GPT.ts
var GPT = class {
  name;
  type;
  url;
  default_model;
  supports_message_history;
  need_slice_text;
  working;
  constructor() {
    this.name = "GPT", this.type = "ChatCompletion";
    this.default_model = "gpt-4", this.url = "https://nexra.aryahcr.cc/api/chat/gpt";
    this.supports_message_history = true;
    this.need_slice_text = true;
    this.working = true;
  }
  /**
   * Asynchronously generates a chat response based on input messages.
   * @param {Array} messages - An array of messages for the chat.
   * @param {IChatCompletionOptions} options - Options for chat generation (optional).
   * @returns {Promise<object>} - A promise that resolves with the generated chat result as a object
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(messages, options) {
    const headers = {
      "Content-Type": "application/json"
    };
    const data = {
      messages,
      "prompt": messages[messages.length - 1].content,
      model: options?.model || "gpt-4",
      markdown: options?.markdown || false
    };
    return axios.post(this.url, data, {
      headers,
      proxy: createProxyConfig(options?.proxy),
      responseType: options?.stream ? "stream" : "text"
    }).then(async (response) => {
      return handleStream({ data: response.data, name: this.name }, options?.stream || false, this.handleResponse.bind(this));
    });
  }
  handleResponse(text) {
    text = text.substring(text.indexOf("{"), text.length);
    const obj = JSON.parse(text);
    if (!obj || !obj.gpt)
      throw new Error("Invalid response.");
    return obj.gpt;
  }
};
var GPT_default = GPT;

// src/Providers/ChatCompletion/ChatBase.ts
import axios2 from "axios";
var ChatBase = class {
  name;
  type;
  url;
  default_model;
  supports_message_history;
  need_slice_text;
  wrong_responses;
  working;
  constructor() {
    this.name = "ChatBase";
    this.type = "ChatCompletion";
    this.url = "https://www.chatbase.co";
    this.default_model = "gpt-3.5-turbo", this.supports_message_history = true;
    this.need_slice_text = true;
    this.wrong_responses = ["support@chatbase.co"];
    this.working = false;
  }
  /**
   * Asynchronously generates a chat response based on input messages.
   * @param {Array} messages - An array of messages for the chat.
   * @param {IChatCompletionOptions} options - Options for chat generation (optional).
   * @returns {Promise<string>} - A promise that resolves with the generated chat result as a string.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(messages, options) {
    const chat_id = "z2c2HSfKnCTh5J4650V0I";
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
      "Accept": "*/*",
      "Accept-language": "en,fr-FR;q=0.9,fr;q=0.8,es-ES;q=0.7,es;q=0.6,en-US;q=0.5,am;q=0.4,de;q=0.3",
      "Origin": this.url,
      "Referer": `${this.url}/`,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin"
    };
    const defaultSystemMessage = {
      // Necessary to avoid issues when fetching, especially with cloned messages objects.
      role: "system",
      content: `You're an OpenAI assistant". [${generateRandomId(5)}]`
    };
    messages.unshift(defaultSystemMessage);
    const data = {
      "messages": messages,
      "captchaCode": "hadsa",
      "chatId": chat_id,
      "conversationId": `kcXpqEnqUie3dnJlsRi_O-${chat_id}`
    };
    return axios2.post("https://www.chatbase.co/api/fe/chat", data, {
      headers,
      proxy: createProxyConfig(options?.proxy),
      responseType: options?.stream ? "stream" : "text"
    }).then((response) => {
      return handleStream({ data: response.data, name: this.name }, options?.stream || false, this.handleResponse.bind(this));
    });
  }
  handleResponse(text) {
    if (this.wrong_responses.some((elemento) => text.includes(elemento)))
      throw new Error("Invalid response. Please try again later.");
    return text;
  }
};
var ChatBase_default = ChatBase;

// src/Providers/ChatCompletion/Bing.ts
import axios3 from "axios";
var Bing = class {
  name;
  type;
  default_model;
  url;
  supports_message_history;
  need_slice_text;
  working;
  constructor() {
    this.name = "Bing", this.type = "ChatCompletion";
    this.default_model = "gpt-4", this.url = "https://nexra.aryahcr.cc/api/chat/complements";
    this.supports_message_history = true;
    this.need_slice_text = true;
    this.working = true;
  }
  /**
   * Asynchronously generates a chat response based on input messages.
   * @param {Array} messages - An array of messages for the chat.
   * @param {IChatCompletionOptions} options - Options for chat generation (optional).
   * @returns {Promise<object>} - A promise that resolves with the generated chat result as a object
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(messages, options) {
    const headers = {
      "Content-Type": "application/json"
    };
    const data = {
      messages,
      "conversation_style": options?.conversationStyle || "Balanced",
      "markdown": options?.markdown || false,
      "stream": options?.stream || false,
      "model": "Bing"
    };
    return axios3.post(this.url, data, {
      headers,
      proxy: createProxyConfig(options?.proxy),
      responseType: options?.stream ? "stream" : "text"
    }).then(async (response) => {
      return handleStream({ data: response.data, name: this.name }, options?.stream || false, this.handleResponse.bind(this));
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    if (typeof text !== "string")
      throw new Error("Invalid response. Please try again later.");
    if (text.includes(`"finish":true`))
      return "";
    let match = text.match(/"message":"(.*?)","original":/);
    let content = match ? match[1] : null;
    return content;
  }
};
var Bing_default = Bing;

// src/Providers/Translation/TranslateAI.ts
import axios4 from "axios";

// src/assets/translate_supported_langs.ts
var supported_langs = ["es", "en", "af", "ay", "sq", "de", "am", "ar", "hy", "as", "az", "bm", "bn", "bho", "be", "my", "bs", "bg", "km", "kn", "ca", "ceb", "cs", "ny", "zh-CN", "zh-TW", "si", "ko", "co", "ht", "hr", "da", "dv", "doi", "sk", "sl", "eo", "et", "eu", "ee", "fi", "fr", "fy", "gd", "cy", "gl", "ka", "el", "gn", "gu", "ha", "haw", "iw", "hi", "hmn", "hu", "ig", "ilo", "id", "ga", "is", "it", "ja", "jw", "kk", "rw", "ky", "gom", "kri", "ku", "ckb", "lo", "la", "lv", "ln", "lt", "lg", "lb", "mk", "mai", "ml", "ms", "mg", "mt", "mi", "mr", "mni-Mtei", "lus", "mn", "nl", "ne", "no", "or", "om", "pa", "ps", "fa", "pl", "pt", "qu", "ro", "ru", "sm", "sa", "nso", "sr", "st", "sn", "sd", "so", "sw", "sv", "su", "tl", "th", "ta", "tt", "tg", "te", "ti", "ts", "tr", "tk", "ak", "uk", "ug", "ur", "uz", "vi", "xh", "yi", "yo", "zu"];

// src/Providers/Translation/TranslateAI.ts
var TranslateAI = class {
  name;
  type;
  url;
  supported_langs;
  need_slice_text;
  working;
  constructor() {
    this.name = "TranslateAI", this.type = "Translation";
    this.url = "https://nexra.aryahcr.cc/api/translate/";
    this.supported_langs = supported_langs;
    this.need_slice_text = false;
    this.working = true;
  }
  /**
   * Translates text to a target language.
   * @param {Options} options - Options for translation (optional).
   * @returns {Promise<object>} - Promise that resolves with the translation result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(options) {
    const headers = {
      "Content-Type": "application/json"
    };
    const data = {
      text: options.text,
      source: options.source,
      target: options.target
    };
    return axios4.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(data) {
    if (!data)
      throw new Error("Invalid response.");
    return { source: data.source, target: data.target, translation: data.translate };
  }
};
var TranslateAI_default = TranslateAI;

// src/Providers/ImageGeneration/Pixart.ts
import axios5 from "axios";
var Pixart = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "Pixart", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {
      negativePrompt: "",
      imageStyle: "(No style)",
      width: 1024,
      height: 1024,
      samplingMethod: "DPM-Solver",
      cfgScale: 4.5,
      dpmInferenceSteps: 14,
      saGuidanceScale: 3,
      saInferenceSteps: 25
    };
    this.need_slice_text = false;
    this.working = false;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt, options) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "pixart-a",
      data: {
        prompt_negative: options?.negativePrompt || this.default_options.negativePrompt,
        image_style: options?.imageStyle || this.default_options.imageStyle,
        width: options?.width || this.default_options.width,
        height: options?.height || this.default_options.height,
        sampler: options?.samplingMethod || this.default_options.samplingMethod,
        dpm_guidance_scale: options?.cfgScale || this.default_options.cfgScale,
        dpm_inference_steps: options?.dpmInferenceSteps || this.default_options.dpmInferenceSteps,
        sa_guidance_scale: options?.saGuidanceScale || this.default_options.saGuidanceScale,
        sa_inference_steps: options?.saInferenceSteps || this.default_options.saInferenceSteps
      }
    };
    return axios5.post("https://nexra.aryahcr.cc/api/image/complements", data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var Pixart_default = Pixart;

// src/Providers/ImageGeneration/PixartLCM.ts
import axios6 from "axios";
var PixartLCM = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "PixartLCM", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {
      negativePrompt: "",
      imageStyle: "(No style)",
      width: 1024,
      height: 1024,
      lcmInferenceSteps: 9
    };
    this.need_slice_text = false;
    this.working = false;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt, options) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "pixart-lcm",
      data: {
        prompt_negative: options?.negativePrompt || this.default_options.negativePrompt,
        image_style: options?.imageStyle || this.default_options.imageStyle,
        width: options?.width || this.default_options.width,
        height: options?.height || this.default_options.height,
        lcm_inference_steps: options?.lcmInferenceSteps || this.default_options.lcmInferenceSteps
      }
    };
    return axios6.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var PixartLCM_default = PixartLCM;

// src/Providers/ImageGeneration/Emi.ts
import axios7 from "axios";
var Emi = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "Emi", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {};
    this.need_slice_text = false;
    this.working = true;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "emi"
    };
    return axios7.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    const matchs = text.match(/\{(.*?)\}/);
    let img = JSON.parse(matchs[0]);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var Emi_default = Emi;

// src/Providers/ImageGeneration/Dalle.ts
import axios8 from "axios";
var Dalle = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "Dalle", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {};
    this.need_slice_text = false;
    this.working = true;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "dalle"
    };
    return axios8.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    const matchs = text.match(/\{(.*?)\}/);
    let img = JSON.parse(matchs[0]);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var Dalle_default = Dalle;

// src/Providers/ImageGeneration/DalleMini.ts
import axios9 from "axios";
var DalleMini = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "DalleMini", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {};
    this.need_slice_text = false;
    this.working = true;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "dalle-mini"
    };
    return axios9.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    const matchs = text.match(/\{(.*?)\}/);
    let img = JSON.parse(matchs[0]);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var DalleMini_default = DalleMini;

// src/Providers/ImageGeneration/Dalle2.ts
import axios10 from "axios";
var Dalle2 = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "Dalle2", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {
      useGpu: false,
      promptImprovement: false
    };
    this.need_slice_text = false;
    this.working = false;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt, options) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "dalle2",
      data: {
        gpu: options?.useGpu || this.default_options.useGpu,
        prompt_improvement: options?.promptImprovement || this.default_options.promptImprovement
      }
    };
    return axios10.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var Dalle2_default = Dalle2;

// src/Providers/ImageGeneration/Prodia.ts
import axios11 from "axios";
var Prodia = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "Prodia", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {
      negativePrompt: "",
      model: "absolutereality_V16.safetensors [37db0fc3]",
      samplingMethod: "DPM++ 2M Karras",
      samplingSteps: 25,
      cfgScale: 7
    };
    this.need_slice_text = false;
    this.working = true;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt, options) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "prodia",
      data: {
        negative_prompt: options?.negativePrompt || this.default_options.negativePrompt,
        model: options?.model || this.default_options.model,
        sampler: options?.samplingMethod || this.default_options.samplingMethod,
        steps: options?.samplingSteps || this.default_options.samplingSteps,
        cfg_scale: options?.cfgScale || this.default_options.cfgScale
      }
    };
    return axios11.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var Prodia_default = Prodia;

// src/Providers/ImageGeneration/ProdiaStableDiffusion.ts
import axios12 from "axios";
var ProdiaStableDiffusion = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "ProdiaStableDiffusion", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {
      negativePrompt: "",
      model: "absolutereality_v181.safetensors [3d9d4d2b]",
      width: 512,
      height: 512,
      samplingMethod: "DPM++ 2M Karras",
      samplingSteps: 25,
      cfgScale: 7
    };
    this.need_slice_text = false;
    this.working = false;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt, options) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "prodia-stablediffusion",
      data: {
        prompt_negative: options?.negativePrompt || this.default_options.negativePrompt,
        model: options?.model || this.default_options.model,
        width: options?.width || this.default_options.width,
        height: options?.height || this.default_options.height,
        sampling_method: options?.samplingMethod || this.default_options.samplingMethod,
        sampling_steps: options?.samplingSteps || this.default_options.samplingSteps,
        cfg_scale: options?.cfgScale || this.default_options.cfgScale
      }
    };
    return axios12.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      console.log(e);
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var ProdiaStableDiffusion_default = ProdiaStableDiffusion;

// src/Providers/ImageGeneration/ProdiaStableDiffusionXL.ts
import axios13 from "axios";
var ProdiaStableDiffusionXL = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "ProdiaStableDiffusionXL", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {
      negativePrompt: "",
      model: "sd_xl_base_1.0.safetensors [be9edd61]",
      width: 1024,
      height: 1024,
      samplingMethod: "DPM++ 2M Karras",
      samplingSteps: 25,
      cfgScale: 7
    };
    this.need_slice_text = false;
    this.working = false;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt, options) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "prodia-stablediffusion-xl",
      data: {
        prompt_negative: options?.negativePrompt || this.default_options.negativePrompt,
        model: options?.model || this.default_options.model,
        width: options?.width || this.default_options.width,
        height: options?.height || this.default_options.height,
        sampling_method: options?.samplingMethod || this.default_options.samplingMethod,
        sampling_steps: options?.samplingSteps || this.default_options.samplingSteps,
        cfg_scale: options?.cfgScale || this.default_options.cfgScale
      }
    };
    return axios13.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var ProdiaStableDiffusionXL_default = ProdiaStableDiffusionXL;

// src/Providers/ImageGeneration/StableDiffusionLite.ts
import axios14 from "axios";
var StableDiffusionLite = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "StableDiffusionLite", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {};
    this.need_slice_text = false;
    this.working = true;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "stablediffusion-1.5"
    };
    return axios14.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var StableDiffusionLite_default = StableDiffusionLite;

// src/Providers/ImageGeneration/StableDiffusionPlus.ts
import axios15 from "axios";
var StableDiffusionPlus = class {
  name;
  type;
  url;
  default_options;
  need_slice_text;
  working;
  constructor() {
    this.name = "StableDiffusionPlus", this.type = "ImageGeneration";
    this.url = "https://nexra.aryahcr.cc/api/image/complements";
    this.default_options = {
      negativePrompt: "",
      saGuidanceScale: 9
    };
    this.need_slice_text = false;
    this.working = true;
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
   * @returns {Promise} - Promise that resolves with the image result.
   * @throws {Error} - Throws an error if fetching data fails.
   */
  async fetchData(prompt, options) {
    const headers = { "Content-Type": "application/json" };
    const data = {
      prompt,
      model: "stablediffusion-2.1",
      data: {
        prompt_negative: options?.negativePrompt || this.default_options.negativePrompt,
        guidance_scale: options?.saGuidanceScale || this.default_options.saGuidanceScale
      }
    };
    return axios15.post(this.url, data, { headers }).then(async (response) => {
      return this.handleResponse(response.data);
    }).catch((e) => {
      if (e.message.startsWith("Invalid response."))
        throw new Error(e.message);
      throw new Error("Failed to fetch data. Please try again later.");
    });
  }
  handleResponse(text) {
    text = text.substring(text.indexOf("{"), text.length);
    let img = JSON.parse(text);
    img = img.images[0].split(";base64,").pop();
    return img;
  }
};
var StableDiffusionPlus_default = StableDiffusionPlus;

// src/Providers/ProviderList.ts
var providers = {
  GPT: new GPT_default(),
  ChatBase: new ChatBase_default(),
  Bing: new Bing_default(),
  TranslateAI: new TranslateAI_default(),
  Pixart: new Pixart_default(),
  PixartLCM: new PixartLCM_default(),
  Emi: new Emi_default(),
  Dalle: new Dalle_default(),
  DalleMini: new DalleMini_default(),
  Dalle2: new Dalle2_default(),
  Prodia: new Prodia_default(),
  ProdiaStableDiffusion: new ProdiaStableDiffusion_default(),
  ProdiaStableDiffusionXL: new ProdiaStableDiffusionXL_default(),
  StableDiffusionLite: new StableDiffusionLite_default(),
  StableDiffusionPlus: new StableDiffusionPlus_default()
};
var models = {
  GPT: [
    "gpt-4",
    "gpt-4-0613",
    "gpt-4-32k",
    "gpt-4-0314",
    "gpt-4-32k-0314",
    "gpt-3.5-turbo",
    "gpt-3.5-turbo-16k",
    "gpt-3.5-turbo-0613",
    "gpt-3.5-turbo-16k-0613",
    "gpt-3.5-turbo-0301",
    "text-davinci-003",
    "text-davinci-002",
    "code-davinci-002",
    "gpt-3",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
    "davinci",
    "curie",
    "babbage",
    "ada",
    "babbage-002",
    "davinci-002"
  ],
  ChatBase: ["gpt-3.5-turbo"],
  Bing: ["gpt-4"],
  Prodia: [
    "3Guofeng3_v34.safetensors [50f420de]",
    "absolutereality_V16.safetensors [37db0fc3]",
    "absolutereality_v181.safetensors [3d9d4d2b]",
    "amIReal_V41.safetensors [0a8a2e61]",
    "analog-diffusion-1.0.ckpt [9ca13f02]",
    "anythingv3_0-pruned.ckpt [2700c435]",
    "anything-v4.5-pruned.ckpt [65745d25]",
    "anythingV5_PrtRE.safetensors [893e49b9]",
    "AOM3A3_orangemixs.safetensors [9600da17]",
    "blazing_drive_v10g.safetensors [ca1c1eab]",
    "cetusMix_Version35.safetensors [de2f2560]",
    "childrensStories_v13D.safetensors [9dfaabcb]",
    "childrensStories_v1SemiReal.safetensors [a1c56dbb]",
    "childrensStories_v1ToonAnime.safetensors [2ec7b88b]",
    "Counterfeit_v30.safetensors [9e2a8f19]",
    "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]",
    "cyberrealistic_v33.safetensors [82b0d085]",
    "dalcefo_v4.safetensors [425952fe]",
    "deliberate_v2.safetensors [10ec4b29]",
    "deliberate_v3.safetensors [afd9d2d4]",
    "dreamlike-anime-1.0.safetensors [4520e090]",
    "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]",
    "dreamlike-photoreal-2.0.safetensors [fdcf65e7]",
    "dreamshaper_6BakedVae.safetensors [114c8abb]",
    "dreamshaper_7.safetensors [5cf5ae06]",
    "dreamshaper_8.safetensors [9d40847d]",
    "edgeOfRealism_eorV20.safetensors [3ed5de15]",
    "EimisAnimeDiffusion_V1.ckpt [4f828a15]",
    "elldreths-vivid-mix.safetensors [342d9d26]",
    "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]",
    "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]",
    "juggernaut_aftermath.safetensors [5e20c455]",
    "lofi_v4.safetensors [ccc204d6]",
    "lyriel_v16.safetensors [68fceea2]",
    "majicmixRealistic_v4.safetensors [29d0de58]",
    "mechamix_v10.safetensors [ee685731]",
    "meinamix_meinaV9.safetensors [2ec66ab0]",
    "meinamix_meinaV11.safetensors [b56ce717]",
    "neverendingDream_v122.safetensors [f964ceeb]",
    "openjourney_V4.ckpt [ca2f377f]",
    "pastelMixStylizedAnime_pruned_fp16.safetensors [793a26e8]",
    "portraitplus_V1.0.safetensors [1400e684]",
    "protogenx34.safetensors [5896f8d5]",
    "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]",
    "Realistic_Vision_V2.0.safetensors [79587710]",
    "Realistic_Vision_V4.0.safetensors [29a7afaa]",
    "Realistic_Vision_V5.0.safetensors [614d1063]",
    "redshift_diffusion-V10.safetensors [1400e684]",
    "revAnimated_v122.safetensors [3f4fefd9]",
    "rundiffusionFX25D_v10.safetensors [cd12b0ee]",
    "rundiffusionFX_v10.safetensors [cd4e694d]",
    "sdv1_4.ckpt [7460a6fa]",
    "shoninsBeautiful_v10.safetensors [25d8c546]",
    "theallys-mix-ii-churned.safetensors [5d9225a4]",
    "timeless-1.0.ckpt [7c4971d4]",
    "toonyou_beta6.safetensors [980f6b15]"
  ],
  ProdiaStableDiffusionXL: [
    "sd_xl_base_1.0.safetensors [be9edd61]",
    "dreamshaperXL10_alpha2.safetensors [c8afe2ef]",
    "dynavisionXL_0411.safetensors [c39cc051]",
    "juggernautXL_v45.safetensors [e75f5471]",
    "realismEngineSDXL_v10.safetensors [af771c3f]"
  ]
};
models.ProdiaStableDiffusion = [
  ...models.Prodia,
  "v1-5-pruned-emaonly.safetensors [d7049739]",
  "v1-5-inpainting.safetensors [21c7ab71]"
];
var imageStyles = {
  Pixart: [
    "(No style)",
    "Cinematic",
    "Photographic",
    "Anime",
    "Manga",
    "Digital Art",
    "Pixel art",
    "Fantasy art",
    "Neonpunk",
    "3D Model"
  ]
};
imageStyles.PixartLCM = [...imageStyles.Pixart];
var samplerMethods = {
  Pixart: [
    "DPM-Solver",
    "SA-Solver"
  ],
  Prodia: [
    "Euler",
    "Euler a",
    "Heun",
    "DPM++ 2M Karras",
    "DPM++ SDE Karras",
    "DDIM"
  ],
  ProdiaStableDiffusionXL: [
    "Euler",
    "Euler a",
    "LMS",
    "Heun",
    "DPM2",
    "DPM2 a",
    "DPM++ 2S a",
    "DPM++ 2M",
    "DPM++ SDE",
    "DPM fast",
    "DPM adaptive",
    "LMS Karras",
    "DPM2 Karras",
    "DPM2 a Karras",
    "DPM++ 2S a Karras",
    "DPM++ 2M Karras",
    "DPM++ SDE Karras"
  ]
};
samplerMethods.ProdiaStableDiffusion = [
  ...samplerMethods.ProdiaStableDiffusionXL,
  "DDIM",
  "PLMS"
];

// src/util/util.ts
function runLog(logger, msg, reset) {
  logger(msg);
  if (reset)
    console.log();
}
function createProxyConfig(proxy) {
  if (!proxy || proxy.length == 0)
    return void 0;
  const [host, port] = proxy.split(":");
  if (!host || !port)
    return void 0;
  return {
    host,
    port: parseInt(port, 10)
  };
}
function generateRandomId(max) {
  return Math.random().toString(36).substring(0, max);
}
function stringToStream(text, chunkSize) {
  let offset = 0;
  return new Readable({
    read(size) {
      const chunk = text.slice(offset, offset + chunkSize);
      offset += chunkSize;
      if (chunk.length > 0) {
        this.push(chunk);
      } else {
        this.push(size ? null : null);
      }
    }
  });
}
function getProviderFromList(providersList, logger, options) {
  if (options?.debug)
    runLog(logger.await, "Picking a provider from the working list...");
  let providerWorking = lookForProvider(providersList, options);
  if (!providerWorking) {
    if (options?.debug)
      runLog(logger.error, "Provider not found.");
    throw Error("Provider not found");
  }
  if (options?.debug) {
    runLog(logger.success, `Provider found: ${providerWorking.name}`, true);
  }
  return providerWorking;
}
function lookForProvider(providersList, options) {
  let providerWorking;
  for (const provider of Object.values(providersList)) {
    if (!options?.model && provider && provider.working) {
      providerWorking = provider;
      break;
    }
    if (options?.model && models[provider.name].includes(options?.model)) {
      if (provider.working) {
        providerWorking = provider;
        break;
      }
    }
  }
  return providerWorking;
}

// src/handlers/ChatCompletionHandler.ts
var model_log = new Signale({ interactive: true, scope: "model" });
var provider_log = new Signale({ interactive: true, scope: "provider" });
var fetch_log = new Signale({ interactive: true, scope: "fetch" });
var output_log = new Signale({ interactive: true, scope: "output" });
var ChatCompletionHandler = class {
  providersList;
  constructor() {
    this.providersList = Object.fromEntries(
      Object.entries(providers).filter(([_, provider]) => provider.type === "ChatCompletion")
    );
  }
  /**
   * Complete messages for the chat.
   * @param {Array} messages - The input messages for the chat.
   * @param {Options} options - Options for chat generation (optional).
   * @returns {Promise<any>} - Promise that resolves with the chat generation result.
   */
  async generateCompletion(messages, options) {
    let { debug, model, provider, stream, retry, output, chunkSize } = options || {};
    if (!provider)
      provider = getProviderFromList(this.providersList, provider_log, { model, debug });
    else if (debug)
      runLog(provider_log.success, `Provider found: ${provider.name}`, true);
    if (debug)
      runLog(model_log.success, `Using the model: ${model || provider.default_model}`, true);
    let text = "";
    if (!retry && !output) {
      text = await this.getText(messages, options, provider);
      return text;
    }
    if (retry || output)
      text = await this.runPreprocessing(messages, options || {}, provider);
    if (stream)
      return { data: await stringToStream(text, chunkSize || 5), name: "post_process" };
    return text;
  }
  async getText(messages, options, provider) {
    const { debug } = options || {};
    if (debug)
      runLog(provider_log.await, `Fetching data from the provider: ${provider.name}`);
    const text = await provider.fetchData(messages, options);
    if (debug)
      runLog(provider_log.success, `Data was successfully fetched from the "${provider.name}" provider`, true);
    return text;
  }
  async runPreprocessing(messages, options, provider) {
    let text = "";
    if (options)
      options.stream = false;
    if (options.retry)
      text = await this.retryOperations(messages, options, provider);
    if (options.output)
      text = await this.runOutput(text, messages, options, provider);
    return text;
  }
  async retryOperations(messages, options, provider) {
    let { debug, retry } = options || {};
    let responseText = "", conditionResult = false;
    let stayInLoop = false, flag = 0;
    do {
      if (debug)
        runLog(fetch_log.await, `[${flag + 1}/${retry.times}] - Retry #${flag + 1}`);
      const NoStreamOptions = { ...options };
      NoStreamOptions.stream = false;
      responseText = await provider.fetchData(messages, NoStreamOptions);
      conditionResult = await Promise.resolve(this.attemptOperation(retry.condition, responseText));
      flag++;
      stayInLoop = retry && retry.condition && !(conditionResult || flag == retry.times);
      if (debug) {
        if (conditionResult)
          runLog(fetch_log.success, `[${flag}/${retry.times}] - Retry #${flag}`, !stayInLoop);
        else
          runLog(fetch_log.error, `[${flag}/${retry.times}] - Retry #${flag}`, !stayInLoop);
      }
    } while (stayInLoop);
    return responseText;
  }
  async runOutput(text, messages, options, provider) {
    const { debug, output } = options || {};
    if (!text || text.length == 0)
      text = await this.getText(messages, options, provider);
    if (debug)
      runLog(output_log.await, `Running the output function...`);
    text = await Promise.resolve(output(text));
    if (debug)
      runLog(output_log.success, `Output function runtime finalized.`, true);
    return text;
  }
  async attemptOperation(condition, text) {
    try {
      if (!await Promise.resolve(condition(text)))
        return false;
      return true;
    } catch {
      return false;
    }
  }
};

// src/handlers/TranslationHandler.ts
import { Signale as Signale2 } from "signale";
var provider_log2 = new Signale2({ interactive: true, scope: "provider" });
var TranslationHandler = class {
  providersList;
  constructor() {
    this.providersList = Object.fromEntries(
      Object.entries(providers).filter(([_, provider]) => provider.type === "Translation")
    );
  }
  /**
   * Translates text to a target language.
   * @param {Options} options - Options for translation.
   * @returns {Promise<any>} - Promise that resolves with a object with the translated data.
   */
  async generateTranslation(options) {
    let { debug, provider } = options;
    if (!provider)
      provider = getProviderFromList(this.providersList, provider_log2, { model: void 0, debug });
    else if (debug)
      runLog(provider_log2.success, `Provider found: ${provider.name}`, true);
    if (!provider.supported_langs.includes(options.source))
      throw new Error("The source language ID is not included in the provider's list of supported IDs.");
    if (!provider.supported_langs.includes(options.target))
      throw new Error("The target language ID is not included in the provider's list of supported IDs.");
    if (debug)
      runLog(provider_log2.await, `Fetching data from the provider: ${provider.name}`);
    const data = await provider.fetchData(options);
    if (debug)
      runLog(provider_log2.success, `Data was successfully fetched from the "${provider.name}" provider`, true);
    return data;
  }
};

// src/handlers/ImageGenerationHandler.ts
import { Signale as Signale3 } from "signale";
var provider_log3 = new Signale3({ interactive: true, scope: "provider" });
var options_log = new Signale3({ interactive: true, scope: "options" });
var ImageGenerationHandler = class {
  providersList;
  constructor() {
    this.providersList = Object.fromEntries(
      Object.entries(providers).filter(([_, provider]) => provider.type === "ImageGeneration")
    );
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @param {IImageGenerationOptions} options - Provider Option's necessary to generate an image.
   * @returns {Promise} - Promise that resolves with the image result.
   */
  async imageGeneration(prompt, options) {
    let { debug, provider } = options || {};
    if (!provider)
      provider = getProviderFromList(this.providersList, provider_log3, { model: void 0, debug });
    else if (debug)
      runLog(provider_log3.success, `Provider found: ${provider.name}`, true);
    if (debug && options && options.providerOptions) {
      this.notifyOptionsUnused(provider, options.providerOptions);
      if (options.providerOptions.model || options.providerOptions.imageStyle || options.providerOptions.samplingMethod) {
        options.providerOptions = this.checkProviderOptionsList(provider, options.providerOptions);
      }
    }
    if (!options)
      options = provider.default_options;
    if (debug)
      runLog(provider_log3.await, `Fetching data from the provider: ${provider.name}`);
    const data = await provider.fetchData(prompt, options?.providerOptions);
    if (debug)
      runLog(provider_log3.success, `Data was successfully fetched from the "${provider.name}" provider`, true);
    return data;
  }
  notifyOptionsUnused(provider, providerOptions) {
    const validImageGenerationProviderOptions = [
      "model",
      // Prodia Prodia-StableDiffusion Prodia-StableDiffusion-XL
      "negativePrompt",
      // Pixart-A Pixart-LCM Prodia Prodia-StableDiffusion Prodia-StableDiffusion-XL
      "imageStyle",
      // Pixart-A Pixart-LCM 
      "height",
      // Pixart-A Pixart-LCM Prodia-StableDiffusion Prodia-StableDiffusion-XL
      "width",
      // Pixart-A Pixart-LCM Prodia-StableDiffusion Prodia-StableDiffusion-XL
      "samplingSteps",
      // Prodia Prodia-StableDiffusion Prodia-StableDiffusion-XL
      "samplingMethod",
      // Pixart-A Prodia Prodia-StableDiffusion Prodia-StableDiffusion-XL
      "cfgScale",
      // Prodia Prodia-StableDiffusion Prodia-StableDiffusion-XL
      "dpmGuidanceScale",
      // Pixart-A
      "dpmInferenceSteps",
      // Pixart-A
      "saGuidanceScale",
      // Pixart-A
      "saInferenceSteps",
      // Pixart-A
      "lcmInferenceSteps",
      // Pixart-LCM
      "useGpu",
      // Dalle2
      "promptImprovement"
      // Dalle2
    ];
    for (const providerOption of Object.keys(providerOptions)) {
      if (!validImageGenerationProviderOptions.includes(providerOption))
        continue;
      if (!Object.keys(provider.default_options).includes(providerOption))
        runLog(options_log.warn, `The "${providerOption}" option you used isn't supported by the "${provider.name}" provider, so it's being ignored.`, true);
    }
  }
  checkProviderOptionsList(provider, providerOptions) {
    if (provider.default_options?.model && providerOptions.model) {
      providerOptions.model = providerOptions.model.trim();
      if (!models[provider.name].includes(providerOptions.model))
        runLog(options_log.warn, `The "model" value you used it's not supported by the "${provider.name}" provider, so the default provider model "${provider.default_options?.model}" is being used instead.`, true);
    }
    if (provider.default_options?.imageStyle && providerOptions.imageStyle) {
      providerOptions.imageStyle = providerOptions.imageStyle.trim();
      if (!imageStyles[provider.name].includes(providerOptions.imageStyle))
        runLog(options_log.warn, `The "imageStyle" value you used it's not supported by the "${provider.name}" provider, so the default provider image style "${provider.default_options?.imageStyle}" is being used instead.`, true);
    }
    if (provider.default_options?.samplingMethod && providerOptions.samplingMethod) {
      providerOptions.samplingMethod = providerOptions.samplingMethod.trim();
      if (!samplerMethods[provider.name].includes(providerOptions.samplingMethod))
        runLog(options_log.warn, `The "samplingMethod" value you used it's not supported by the "${provider.name}" provider, so the default provider sampling method "${provider.default_options?.samplingMethod}" is being used instead.`, true);
    }
    return providerOptions;
  }
};

// src/OptionsHandler.ts
var OptionsHandler = class {
  /**
   * Checks the validity of options for chat generation.
   * @param {Object} options - Options for chat generation.
   * @throws {Error} - Throws an error if options are invalid.
   * @returns {boolean} - Returns true if options are valid.
   */
  static checkChatCompletionOptions(options) {
    if (typeof options !== "object")
      throw new Error("Options must be a valid object.");
    if (options.provider && !Object.keys(providers).some((key) => options.provider instanceof providers[key].constructor))
      throw new Error("Provider option must be valid. Try { provider: (new G4F()).providers.GPT, ... }");
    if (options.provider && options.provider.type != "ChatCompletion")
      throw new Error("The provider type should be 'ChatCompletion'");
    if (options.provider && options.model && !models[options.provider.name].some((model) => model == options.model))
      throw new Error("You need to include a model that is compatible with the selected provider.");
    if (options.retry && typeof options.retry != "object")
      throw new Error("Retry option must be a object.");
    if (options.retry) {
      if (!options.retry.times)
        throw new Error("Times option must be provided.");
      if (isNaN(options.retry.times))
        throw new Error("Times option must be an integer.");
      if (options.retry.condition) {
        if (typeof options.retry.condition !== "function")
          throw new Error("Retry condition option must be a function.");
        if (typeof options.retry.condition("") !== "boolean")
          throw new Error("Retry condition option must be a function returning a boolean.");
      }
      if (!options.retry.condition && options.retry.times)
        throw new Error("Retry condition must be provided if times option is specified.");
    }
    if (options.output) {
      if (typeof options.output !== "function")
        throw new Error("Output option must be a function.");
      if (typeof options.output("") !== "string")
        throw new Error("Output option option must be a function returning a string.");
    }
    if (options.conversationStyle) {
      if (options.provider && options.provider.name != "Bing")
        throw new Error("Conversation style option is only supported by Bing provider.");
      if (typeof options.conversationStyle !== "string")
        throw new Error("Conversation style option must be a string.");
      if (["creative", "balanced", "precise"].indexOf(options.conversationStyle) == -1)
        throw new Error("Conversation style option must be one of 'creative', 'balanced', or 'precise'.");
    }
    if (options.markdown && typeof options.markdown !== "boolean")
      throw new Error("Markdown option must be a boolean.");
    return true;
  }
  /**
   * Checks the validity of options for translation.
   * @param {Options} options - Options for translation.
   * @throws {Error} - Throws an error if options are invalid.
   * @returns {boolean} - Returns true if options are valid.
   */
  static checkTranslationOptions(options) {
    if (typeof options !== "object")
      throw new Error("Options must be a valid object.");
    if (options.provider && !Object.keys(providers).some((key) => options.provider instanceof providers[key].constructor))
      throw new Error("Provider option must be valid. Try { provider: (new G4F()).providers.Translate, ... }");
    if (options.provider && options.provider.type != "Translation")
      throw new Error("The provider type should be 'Translation'");
    if (!options.text || options.text && options.text.trim().length == 0)
      throw new Error("You need to include a text for the translation.");
    return true;
  }
  /**
   * Checks the validity of options for image generation.
   * @param {Options} options - Options for image generation.
   * @throws {Error} - Throws an error if options are invalid.
   * @returns {boolean} - Returns true if options are valid.
   */
  static checkImageGenerationOptions(options) {
    if (typeof options !== "object")
      throw new Error("Options must be a valid object.");
    if (options.provider && !Object.keys(providers).some((key) => options.provider instanceof providers[key].constructor))
      throw new Error("Provider option must be valid. Try { provider: (new G4F()).providers.Emi, ... }");
    if (options.provider && options.provider.type != "ImageGeneration")
      throw new Error("The provider type should be 'ImageGeneration'");
    if (options.providerOptions) {
      if (typeof options.providerOptions !== "object")
        throw new Error("Provider options must be a valid object.");
      for (const item of ["model", "negativePrompt", "imageStyle", "samplingMethod"])
        if (options.providerOptions[item] && typeof options.providerOptions[item] !== "string")
          throw new Error(`The provider option "${item}" must be a string.`);
      for (const item of ["height", "width", "samplingSteps", "cfgScale", "dpmGuidanceScale", "dpmInferenceSteps", "saGuidanceScale", "saInferenceSteps", "lcmInferenceSteps"])
        if (options.providerOptions[item] && typeof options.providerOptions[item] !== "number")
          throw new Error(`The provider option "${item}" must be an integer.`);
      for (const item of ["useGpu", "promptImprovement"])
        if (options.providerOptions[item] && typeof options.providerOptions[item] !== "boolean")
          throw new Error(`The provider option "${item}" must be a boolean.`);
    }
    return true;
  }
};
var OptionsHandler_default = OptionsHandler;

// src/G4F.ts
var G4F = class {
  completionHandler;
  translationHandler;
  imageGenerationHandler;
  providers;
  constructor() {
    this.completionHandler = new ChatCompletionHandler();
    this.translationHandler = new TranslationHandler();
    this.imageGenerationHandler = new ImageGenerationHandler();
    this.providers = providers;
  }
  /**
   * Complete messages for the chat.
   * @param {Array} messages - The input messages for the chat.
   * @param {Object} options - Options for chat generation (optional).
   * @throws {Error} - Throw an error if the options are invalid or the provider fails at any point
   * @returns {Promise} - Promise that resolves with the chat generation result.
   */
  async chatCompletion(messages, options) {
    if (options)
      OptionsHandler_default.checkChatCompletionOptions(options);
    return await this.completionHandler.generateCompletion(messages, options);
  }
  /**
   * Translate text to a target language.
   * @param {Object} options - Options for translation.
   * @throws {Error} - Throw an error if the options are invalid or the provider fails at any point
   * @returns {Promise} - Promise that resolves with the translation result.
   */
  async translation(options) {
    if (options)
      OptionsHandler_default.checkTranslationOptions(options);
    return await this.translationHandler.generateTranslation(options);
  }
  /**
   * Generate an image with a determinate style.
   * @param {string} prompt - Prompt that indicates what kind of image to generate.
   * @param {IImageGenerationOptions} options - Provider Option's necessary to generate an image.
   * @returns {Promise} - Promise that resolves with the image result.
   */
  async imageGeneration(prompt, options) {
    if (options)
      OptionsHandler_default.checkImageGenerationOptions(options);
    return await this.imageGenerationHandler.imageGeneration(prompt, options);
  }
};
var G4F_default = G4F;
export {
  G4F_default as G4F,
  chunkProcessor
};
