type Token =
  | 'BRACE'
  | 'BRACKET'
  | 'COLON'
  | 'COMMA'
  | 'STRING_KEY'
  | 'STRING_LITERAL'
  | 'NUMBER_LITERAL'
  | 'BOOLEAN_LITERAL'
  | 'NULL_LITERAL';

interface Options {
  readonly pretty?: boolean;
  readonly colors?: { readonly [token in Token]?: string };
}

declare function colorizeJson(json: string, options?: Options): string;

export = colorizeJson;
