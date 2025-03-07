import { z } from 'zod';
export declare const InstagramStoryArgsSchema: z.ZodObject<{
    0: z.ZodString;
}, "strip", z.ZodTypeAny, {
    0: string;
}, {
    0: string;
}>;
export declare const InstagramStoryItemSchema: z.ZodObject<{
    thumbnail: z.ZodString;
    url: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"image">, z.ZodLiteral<"video">]>;
}, "strip", z.ZodTypeAny, {
    type: "video" | "image";
    thumbnail: string;
    url: string;
}, {
    type: "video" | "image";
    thumbnail: string;
    url: string;
}>;
export type InstagramStoryItem = z.infer<typeof InstagramStoryItemSchema>;
export declare const InstagramStorySchema: z.ZodArray<z.ZodObject<{
    thumbnail: z.ZodString;
    url: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"image">, z.ZodLiteral<"video">]>;
}, "strip", z.ZodTypeAny, {
    type: "video" | "image";
    thumbnail: string;
    url: string;
}, {
    type: "video" | "image";
    thumbnail: string;
    url: string;
}>, "many">;
export type InstagramStory = z.infer<typeof InstagramStorySchema>;
//# sourceMappingURL=instagramstory-v1.d.ts.map