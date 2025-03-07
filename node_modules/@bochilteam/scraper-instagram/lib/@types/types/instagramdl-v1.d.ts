import { z } from 'zod';
export declare const InstagramdlArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const InstagramdlItemSchema: z.ZodObject<{
    thumbnail: z.ZodString;
    url: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"video">, z.ZodLiteral<"image">]>;
}, "strip", z.ZodTypeAny, {
    type: "video" | "image";
    thumbnail: string;
    url: string;
}, {
    type: "video" | "image";
    thumbnail: string;
    url: string;
}>;
export type InstagramdlItem = z.infer<typeof InstagramdlItemSchema>;
export declare const InstagramdlSchema: z.ZodArray<z.ZodObject<{
    thumbnail: z.ZodString;
    url: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"video">, z.ZodLiteral<"image">]>;
}, "strip", z.ZodTypeAny, {
    type: "video" | "image";
    thumbnail: string;
    url: string;
}, {
    type: "video" | "image";
    thumbnail: string;
    url: string;
}>, "many">;
export type Instagramdl = z.infer<typeof InstagramdlSchema>;
//# sourceMappingURL=instagramdl-v1.d.ts.map