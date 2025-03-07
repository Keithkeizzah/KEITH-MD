interface IMessage {
    role: string;
    content: string;
}

interface IChatCompletionOptions {
    debug?: boolean;
    model?: string;
    provider?: any;
    stream?: boolean;
    retry?: {
        condition?: (text: string) => boolean;
        times?: number;
    };
    output?: (text: string) => string;
    conversationStyle?: string;
    markdown?: boolean;
    chunkSize?: number;
    proxy?: string;
}

interface ITranslationOptions {
    debug?: boolean;
    provider?: any;
    text: string;
    source: string;
    target: string;
}

interface IImageGenerationProviderOptions {
    model?: string;
    negativePrompt?: string;
    imageStyle?: string;
    height?: number;
    width?: number;
    samplingSteps?: number;
    samplingMethod?: string;
    cfgScale?: number;
    dpmGuidanceScale?: number;
    dpmInferenceSteps?: number;
    saGuidanceScale?: number;
    saInferenceSteps?: number;
    lcmInferenceSteps?: number;
    useGpu?: boolean;
    promptImprovement?: boolean;
}

interface IImageGenerationOptions {
    debug?: boolean;
    provider?: any;
    providerOptions?: IImageGenerationProviderOptions;
}

declare class GPT {
    name: string;
    type: string;
    url: string;
    default_model: string;
    supports_message_history: boolean;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Asynchronously generates a chat response based on input messages.
     * @param {Array} messages - An array of messages for the chat.
     * @param {IChatCompletionOptions} options - Options for chat generation (optional).
     * @returns {Promise<object>} - A promise that resolves with the generated chat result as a object
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(messages: IMessage[], options: IChatCompletionOptions): Promise<object>;
    handleResponse(text: any): any;
}

declare class ChatBase {
    name: string;
    type: string;
    url: string;
    default_model: string;
    supports_message_history: boolean;
    need_slice_text: boolean;
    wrong_responses: Array<string>;
    working: boolean;
    constructor();
    /**
     * Asynchronously generates a chat response based on input messages.
     * @param {Array} messages - An array of messages for the chat.
     * @param {IChatCompletionOptions} options - Options for chat generation (optional).
     * @returns {Promise<string>} - A promise that resolves with the generated chat result as a string.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(messages: IMessage[], options: IChatCompletionOptions): Promise<object>;
    handleResponse(text: any): any;
}

declare class Bing {
    name: string;
    type: string;
    default_model: string;
    url: string;
    supports_message_history: boolean;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Asynchronously generates a chat response based on input messages.
     * @param {Array} messages - An array of messages for the chat.
     * @param {IChatCompletionOptions} options - Options for chat generation (optional).
     * @returns {Promise<object>} - A promise that resolves with the generated chat result as a object
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(messages: IMessage[], options: IChatCompletionOptions): Promise<object>;
    handleResponse(text: any): string | null;
}

declare class TranslateAI {
    name: string;
    type: string;
    url: string;
    supported_langs: string[];
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Translates text to a target language.
     * @param {Options} options - Options for translation (optional).
     * @returns {Promise<object>} - Promise that resolves with the translation result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(options: ITranslationOptions): Promise<object>;
    handleResponse(data: any): {
        source: any;
        target: any;
        translation: any;
    };
}

declare class Pixart {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string, options?: IImageGenerationProviderOptions): Promise<object>;
    handleResponse(text: any): any;
}

declare class PixartLCM {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string, options?: IImageGenerationProviderOptions): Promise<object>;
    handleResponse(text: any): any;
}

declare class Emi {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string): Promise<object>;
    handleResponse(text: any): any;
}

declare class Dalle {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string): Promise<object>;
    handleResponse(text: any): any;
}

declare class DalleMini {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string): Promise<object>;
    handleResponse(text: any): any;
}

declare class Dalle2 {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string, options?: IImageGenerationProviderOptions): Promise<object>;
    handleResponse(text: any): any;
}

declare class Prodia {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string, options?: IImageGenerationProviderOptions): Promise<object>;
    handleResponse(text: any): any;
}

declare class ProdiaStableDiffusion {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string, options?: IImageGenerationProviderOptions): Promise<object>;
    handleResponse(text: any): any;
}

declare class ProdiaStableDiffusionXL {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string, options?: IImageGenerationProviderOptions): Promise<object>;
    handleResponse(text: any): any;
}

declare class StableDiffusionLite {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string): Promise<object>;
    handleResponse(text: any): any;
}

declare class StableDiffusionPlus {
    name: string;
    type: string;
    url: string;
    default_options: IImageGenerationProviderOptions;
    need_slice_text: boolean;
    working: boolean;
    constructor();
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @param {IImageGenerationProviderOptions} options - Provider Option's necessary to generate an image.
     * @returns {Promise} - Promise that resolves with the image result.
     * @throws {Error} - Throws an error if fetching data fails.
     */
    fetchData(prompt: string, options?: IImageGenerationProviderOptions): Promise<object>;
    handleResponse(text: any): any;
}

interface Providers {
    [key: string]: GPT | ChatBase | Bing | TranslateAI | Pixart | PixartLCM | Emi | Dalle | DalleMini | Dalle2 | Prodia | ProdiaStableDiffusion | ProdiaStableDiffusionXL | StableDiffusionLite | StableDiffusionPlus;
}
declare const providers: Providers;

declare class G4F {
    private completionHandler;
    private translationHandler;
    private imageGenerationHandler;
    providers: typeof providers;
    constructor();
    /**
     * Complete messages for the chat.
     * @param {Array} messages - The input messages for the chat.
     * @param {Object} options - Options for chat generation (optional).
     * @throws {Error} - Throw an error if the options are invalid or the provider fails at any point
     * @returns {Promise} - Promise that resolves with the chat generation result.
     */
    chatCompletion(messages: IMessage[], options?: IChatCompletionOptions): Promise<any>;
    /**
     * Translate text to a target language.
     * @param {Object} options - Options for translation.
     * @throws {Error} - Throw an error if the options are invalid or the provider fails at any point
     * @returns {Promise} - Promise that resolves with the translation result.
     */
    translation(options: ITranslationOptions): Promise<any>;
    /**
     * Generate an image with a determinate style.
     * @param {string} prompt - Prompt that indicates what kind of image to generate.
     * @param {IImageGenerationOptions} options - Provider Option's necessary to generate an image.
     * @returns {Promise} - Promise that resolves with the image result.
     */
    imageGeneration(prompt: string, options?: IImageGenerationOptions): Promise<any>;
}

declare function chunkProcessor(response: any): AsyncGenerator<string, void, unknown>;

export { G4F, chunkProcessor };
