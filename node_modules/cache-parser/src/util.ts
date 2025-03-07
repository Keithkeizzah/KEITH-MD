export function isDuration(val: unknown): boolean {
  return (
    (typeof val === 'string' || typeof val === 'number') &&
    (val = Number(val)) >= 0 &&
    (val as number) < Infinity
  );
}

export function isTruthy(val: unknown): boolean {
  return (
    val === true ||
    typeof val === 'number' ||
    (typeof val === 'string' && val !== 'false')
  );
}

export function parseRawHeaders(headerStr: string): Record<string, string | true> {
  const headers: Record<string, string | true> = {};
  const tokens = headerStr.toLowerCase().replace(/\s+/g, '').split(',');

  for (const token of tokens) {
    const split = token.split('=', 2) as [string, string];
    headers[split[0]] = split[1] ?? true;
  }

  return headers;
}
