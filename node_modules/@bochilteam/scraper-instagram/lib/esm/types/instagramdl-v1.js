import { z } from 'zod';
export const InstagramdlArgsSchema = z.object({
    0: z.string().url()
});
export const InstagramdlItemSchema = z.object({
    thumbnail: z.string().url(),
    url: z.string().url(),
    type: z.literal('video').or(z.literal('image'))
});
export const InstagramdlSchema = z.array(InstagramdlItemSchema);
