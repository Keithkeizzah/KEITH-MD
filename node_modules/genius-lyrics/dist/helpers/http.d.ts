import { request } from "undici";
export * from "undici";
export type RequestOptions = NonNullable<Parameters<typeof request>[1]>;
export type MethodlessRequestOptions = Omit<RequestOptions, "method">;
