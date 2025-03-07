declare function bind(...args: any[]): void;
declare function unbind(element: HTMLInputElement | HTMLTextAreaElement, ...args: any[]): void;
declare function isRomaji(...args: any[]): boolean;
declare function isJapanese(...args: any[]): boolean;
declare function isKana(...args: any[]): boolean;
declare function isHiragana(...args: any[]): boolean;
declare function isKatakana(...args: any[]): boolean;
declare function isMixed(...args: any[]): boolean;
declare function isKanji(...args: any[]): boolean;
declare function toRomaji(...args: any[]): string;
declare function toKana(...args: any[]): string;
declare function toHiragana(...args: any[]): string;
declare function toKatakana(...args: any[]): string;
declare function stripOkurigana(...args: any[]): string;
declare function tokenize(input: string, ...args: any[]): (string[] | Array<{
    type: string;
    value: string;
}>);
declare const VERSION = "5.3.1";
declare const TO_KANA_METHODS: {
    HIRAGANA: "toHiragana";
    KATAKANA: "toKatakana";
};
declare const ROMANIZATIONS: {
    HEPBURN: "hepburn";
};
export { bind, unbind, isRomaji, isJapanese, isKana, isHiragana, isKatakana, isMixed, isKanji, toRomaji, toKana, toHiragana, toKatakana, stripOkurigana, tokenize, VERSION, TO_KANA_METHODS, ROMANIZATIONS };
//# sourceMappingURL=wanakana.min.d.ts.map