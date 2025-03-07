declare function bind(element?: HTMLInputElement | HTMLTextAreaElement, options?: DefaultOptions, debug?: boolean): void;
declare function unbind(element: HTMLInputElement | HTMLTextAreaElement, debug?: boolean): void;
declare function isRomaji(input?: string, allowed?: RegExp): boolean;
declare function isJapanese(input?: string, allowed?: RegExp): boolean;
declare function isKana(input?: string): boolean;
declare function isHiragana(input?: string): boolean;
declare function isKatakana(input?: string): boolean;
declare function isMixed(input?: string, options?: {
    passKanji: boolean;
}): boolean;
declare function isKanji(input?: string): boolean;
declare function toRomaji(input?: string, options?: DefaultOptions, map?: {
    [x: string]: string;
}): string;
declare function toKana(input?: string, options?: DefaultOptions, map?: {
    [x: string]: string;
}): string;
declare function toHiragana(input?: string, options?: DefaultOptions): string;
declare function toKatakana(input?: string, options?: DefaultOptions): string;
declare function stripOkurigana(input?: string, { leading, matchKanji }?: {
    leading: boolean | undefined;
    matchKanji: string | undefined;
}): string;
declare function tokenize(input: string, { compact, detailed }?: {
    compact: boolean | undefined;
    detailed: boolean | undefined;
}): (string[] | Array<{
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
type DefaultOptions = {
    useObsoleteKana?: boolean;
    passRomaji?: boolean;
    convertLongVowelMark?: boolean;
    upcaseKatakana?: boolean;
    IMEMode?: boolean | "toHiragana" | "toKatakana";
    romanization?: "hepburn";
    customKanaMapping?: {
        [index: string]: string;
    };
    customRomajiMapping?: {
        [index: string]: string;
    };
};
export { bind, unbind, isRomaji, isJapanese, isKana, isHiragana, isKatakana, isMixed, isKanji, toRomaji, toKana, toHiragana, toKatakana, stripOkurigana, tokenize, VERSION, TO_KANA_METHODS, ROMANIZATIONS };
//# sourceMappingURL=index.d.ts.map