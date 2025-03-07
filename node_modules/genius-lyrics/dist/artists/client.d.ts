import { Client } from "../client";
import { Artist } from "./artist";
export declare class ArtistsClient {
    readonly client: Client;
    /**
     * @example const ArtistsClient = await Genius.Artist.Client(key);
     */
    constructor(client: Client);
    /**
     * Fetches the artist using the provided ID (requires key).
     * @example const Artist = await ArtistsClient.get(456537);
     */
    get(id: number): Promise<Artist>;
}
