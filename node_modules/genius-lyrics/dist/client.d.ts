import { RequestClient } from "./request";
import { ArtistsClient } from "./artists/client";
import { SongsClient } from "./songs/client";
import { Config } from "./helpers/config";
export declare class Client {
    readonly key?: string | undefined;
    readonly config: Config;
    songs: SongsClient;
    artists: ArtistsClient;
    request: RequestClient;
    api: RequestClient;
    constructor(key?: string | undefined, config?: Config);
}
