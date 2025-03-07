export interface ScrapedSongDataLyricsDataBodyExtendedChild {
    children?: ScrapedSongDataLyricsDataBodyChild[];
    tag: string;
    data?: Record<string, string>;
    attributes?: Record<string, string>;
}
export type ScrapedSongDataLyricsDataBodyChild = string | ScrapedSongDataLyricsDataBodyExtendedChild;
export interface ScrapedSongData {
    currentPage: string;
    deviceType: string;
    session: {
        cmpEnabled: boolean;
        showAds: boolean;
        logClientMetrics: boolean;
        fringeEnabled: boolean;
        features: string[];
    };
    songPage: {
        longTailCacheExperiment: any;
        song: number;
        pinnedQuestions: number[];
        metadataQuestions: string[];
        lyricsData: {
            referents: number[];
            body: {
                html: string;
                children: ScrapedSongDataLyricsDataBodyChild[];
                tag: string;
            };
            lyricsPlaceholderReason: any;
            clientTimestamps: {
                updatedByHumanAt: number;
                lyricsUpdatedAt: number;
            };
        };
        hotSongsPreview: {
            url: string;
            title: string;
            id: number;
        }[];
        featuredQuestion: any;
        showFeaturedQuestion: boolean;
        pendingQuestionCount: number;
        dfpKv: {
            values: string[];
            name: string;
        }[];
        trackingData: {
            value: any;
            key: string;
        }[];
        title: string;
        path: string;
        pageType: string;
        initialAdUnits: string[];
        hotSongsLink: string;
        headerBidPlacements: any[];
        dmpDataLayer: {
            page: {
                type: string;
            };
        };
        controllerAndAction: string;
        chartbeat: {
            title: string;
            sections: string;
            authors: string;
        };
    };
    entities: {
        artists: {
            [id: string]: {
                iq: number;
                url: string;
                slug: string;
                name: string;
                isVerified: boolean;
                isMemeVerified: boolean;
                indexCharacter: string;
                imageUrl: string;
                id: number;
                headerImageUrl: string;
                apiPath: string;
                type: string;
            };
        };
        songs: {
            [id: string]: {
                url: string;
                title: string;
                path: string;
                lyricsState: string;
                id: number;
                apiPath: string;
                type: string;
                writerArtists: {
                    url: string;
                    slug: string;
                    name: string;
                    isVerified: boolean;
                    isMemeVerified: boolean;
                    indexCharacter: string;
                    imageUrl: string;
                    id: number;
                    headerImageUrl: string;
                    apiPath: string;
                    type: string;
                    iq?: number;
                }[];
                verifiedLyricsBy: {
                    currentUserMetadata: {
                        interactions: {
                            following: boolean;
                        };
                        excludedPermissions: string[];
                        permissions: any[];
                    };
                    url: string;
                    roleForDisplay: string;
                    name: string;
                    login: string;
                    isVerified: boolean;
                    isMemeVerified: boolean;
                    iq: number;
                    id: number;
                    humanReadableRoleForDisplay: string;
                    headerImageUrl: string;
                    avatar: {
                        medium: {
                            boundingBox: {
                                height: number;
                                width: number;
                            };
                            url: string;
                        };
                        small: {
                            boundingBox: {
                                height: number;
                                width: number;
                            };
                            url: string;
                        };
                        thumb: {
                            boundingBox: {
                                height: number;
                                width: number;
                            };
                            url: string;
                        };
                        tiny: {
                            boundingBox: {
                                height: number;
                                width: number;
                            };
                            url: string;
                        };
                    };
                    apiPath: string;
                    aboutMeSummary: string;
                    type: string;
                }[];
                verifiedContributors: {
                    user: {
                        currentUserMetadata: {
                            interactions: {
                                following: boolean;
                            };
                            excludedPermissions: string[];
                            permissions: any[];
                        };
                        url: string;
                        roleForDisplay: string;
                        name: string;
                        login: string;
                        isVerified: boolean;
                        isMemeVerified: boolean;
                        iq: number;
                        id: number;
                        humanReadableRoleForDisplay: string;
                        headerImageUrl: string;
                        avatar: {
                            medium: {
                                boundingBox: {
                                    height: number;
                                    width: number;
                                };
                                url: string;
                            };
                            small: {
                                boundingBox: {
                                    height: number;
                                    width: number;
                                };
                                url: string;
                            };
                            thumb: {
                                boundingBox: {
                                    height: number;
                                    width: number;
                                };
                                url: string;
                            };
                            tiny: {
                                boundingBox: {
                                    height: number;
                                    width: number;
                                };
                                url: string;
                            };
                        };
                        apiPath: string;
                        aboutMeSummary: string;
                        type: string;
                    };
                    artist: {
                        iq: number;
                        url: string;
                        slug: string;
                        name: string;
                        isVerified: boolean;
                        isMemeVerified: boolean;
                        indexCharacter: string;
                        imageUrl: string;
                        id: number;
                        headerImageUrl: string;
                        apiPath: string;
                        type: string;
                    };
                    contributions: string[];
                }[];
                verifiedAnnotationsBy: {
                    currentUserMetadata: {
                        interactions: {
                            following: boolean;
                        };
                        excludedPermissions: string[];
                        permissions: any[];
                    };
                    url: string;
                    roleForDisplay: string;
                    name: string;
                    login: string;
                    isVerified: boolean;
                    isMemeVerified: boolean;
                    iq: number;
                    id: number;
                    humanReadableRoleForDisplay: string;
                    headerImageUrl: string;
                    avatar: {
                        medium: {
                            boundingBox: {
                                height: number;
                                width: number;
                            };
                            url: string;
                        };
                        small: {
                            boundingBox: {
                                height: number;
                                width: number;
                            };
                            url: string;
                        };
                        thumb: {
                            boundingBox: {
                                height: number;
                                width: number;
                            };
                            url: string;
                        };
                        tiny: {
                            boundingBox: {
                                height: number;
                                width: number;
                            };
                            url: string;
                        };
                    };
                    apiPath: string;
                    aboutMeSummary: string;
                    type: string;
                }[];
                translationSongs: {
                    url: string;
                    title: string;
                    path: string;
                    lyricsState: string;
                    language: string;
                    id: number;
                    apiPath: string;
                    type: string;
                }[];
                topScholar: {
                    user: {
                        currentUserMetadata: {
                            interactions: {
                                following: boolean;
                            };
                            excludedPermissions: string[];
                            permissions: any[];
                        };
                        url: string;
                        roleForDisplay: string;
                        name: string;
                        login: string;
                        isVerified: boolean;
                        isMemeVerified: boolean;
                        iq: number;
                        id: number;
                        humanReadableRoleForDisplay: string;
                        headerImageUrl: string;
                        avatar: {
                            medium: {
                                boundingBox: {
                                    height: number;
                                    width: number;
                                };
                                url: string;
                            };
                            small: {
                                boundingBox: {
                                    height: number;
                                    width: number;
                                };
                                url: string;
                            };
                            thumb: {
                                boundingBox: {
                                    height: number;
                                    width: number;
                                };
                                url: string;
                            };
                            tiny: {
                                boundingBox: {
                                    height: number;
                                    width: number;
                                };
                                url: string;
                            };
                        };
                        apiPath: string;
                        aboutMeSummary: string;
                        type: string;
                    };
                    pinnedRole: any;
                    attributionValue: number;
                    type: string;
                };
                tags: {
                    url: string;
                    primary: boolean;
                    name: string;
                    id: number;
                    type: string;
                }[];
                songRelationships: {
                    songs: {
                        primaryArtist: {
                            url: string;
                            slug: string;
                            name: string;
                            isVerified: boolean;
                            isMemeVerified: boolean;
                            indexCharacter: string;
                            imageUrl: string;
                            id: number;
                            headerImageUrl: string;
                            apiPath: string;
                            type: string;
                            iq?: number;
                        };
                        featuredArtists: {
                            url: string;
                            slug: string;
                            name: string;
                            isVerified: boolean;
                            isMemeVerified: boolean;
                            indexCharacter: string;
                            imageUrl: string;
                            id: number;
                            headerImageUrl: string;
                            apiPath: string;
                            type: string;
                            iq?: number;
                        }[];
                        url: string;
                        updatedByHumanAt: number;
                        titleWithFeatured: string;
                        title: string;
                        stats: {
                            pageviews?: number;
                            hot: boolean;
                            unreviewedAnnotations: number;
                        };
                        songArtImageUrl: string;
                        songArtImageThumbnailUrl: string;
                        releaseDateWithAbbreviatedMonthForDisplay?: string;
                        releaseDateForDisplay?: string;
                        releaseDateComponents?: {
                            day: number;
                            month: number;
                            year: number;
                        };
                        relationshipsIndexUrl: string;
                        pyongsCount?: number;
                        path: string;
                        lyricsUpdatedAt?: number;
                        lyricsState: string;
                        lyricsOwnerId: number;
                        instrumental: boolean;
                        id: number;
                        headerImageUrl: string;
                        headerImageThumbnailUrl: string;
                        fullTitle: string;
                        artistNames: string;
                        apiPath: string;
                        annotationCount: number;
                        type: string;
                    }[];
                    url?: string;
                    type: string;
                    relationshipType: string;
                }[];
                producerArtists: {
                    iq?: number;
                    url: string;
                    slug: string;
                    name: string;
                    isVerified: boolean;
                    isMemeVerified: boolean;
                    indexCharacter: string;
                    imageUrl: string;
                    id: number;
                    headerImageUrl: string;
                    apiPath: string;
                    type: string;
                }[];
                primaryTag: {
                    url: string;
                    primary: boolean;
                    name: string;
                    id: number;
                    type: string;
                };
                primaryArtist: number;
                media: {
                    url: string;
                    type: string;
                    start?: number;
                    provider: string;
                    nativeUri?: string;
                }[];
                lyricsMarkedStaffApprovedBy: number;
                lyricsMarkedCompleteBy: any;
                featuredArtists: any[];
                descriptionAnnotation: number;
                customPerformances: {
                    artists: {
                        url: string;
                        slug: string;
                        name: string;
                        isVerified: boolean;
                        isMemeVerified: boolean;
                        indexCharacter: string;
                        imageUrl: string;
                        id: number;
                        headerImageUrl: string;
                        apiPath: string;
                        type: string;
                        iq?: number;
                    }[];
                    label: string;
                }[];
                albums: {
                    tracklist: {
                        song: {
                            url: string;
                            title: string;
                            path: string;
                            lyricsState: string;
                            id: number;
                            apiPath: string;
                            type: string;
                        };
                        currentUserMetadata: {
                            excludedPermissions: string[];
                            permissions: string[];
                        };
                        number: number;
                        type: string;
                    }[];
                    artist: {
                        url: string;
                        slug: string;
                        name: string;
                        isVerified: boolean;
                        isMemeVerified: boolean;
                        indexCharacter: string;
                        imageUrl: string;
                        id: number;
                        headerImageUrl: string;
                        apiPath: string;
                        type: string;
                        iq?: number;
                    };
                    url: string;
                    releaseDateForDisplay: string;
                    releaseDateComponents: {
                        day: number;
                        month: number;
                        year: number;
                    };
                    nameWithArtist: string;
                    name: string;
                    id: number;
                    fullTitle: string;
                    coverArtUrl: string;
                    coverArtThumbnailUrl: string;
                    apiPath: string;
                    type: string;
                }[];
                album: number;
                songArtTextColor: string;
                songArtSecondaryColor: string;
                songArtPrimaryColor: string;
                currentUserMetadata: {
                    iqByAction: {};
                    relationships: {};
                    interactions: {
                        following: boolean;
                        pyong: boolean;
                    };
                    excludedPermissions: string[];
                    permissions: string[];
                };
                youtubeUrl: string;
                youtubeStart: string;
                vttpId: any;
                viewableByRoles: any[];
                updatedByHumanAt: number;
                twitterShareMessageWithoutUrl: string;
                twitterShareMessage: string;
                trackingPaths: {
                    concurrent: string;
                    aggregate: string;
                };
                trackingData: {
                    value: any;
                    key: string;
                }[];
                titleWithFeatured: string;
                stats: {
                    pageviews: number;
                    hot: boolean;
                    concurrents: number;
                    verifiedAnnotations: number;
                    unreviewedAnnotations: number;
                    transcribers: number;
                    iqEarners: number;
                    contributors: number;
                    acceptedAnnotations: number;
                };
                spotifyUuid: string;
                soundcloudUrl: any;
                songArtImageUrl: string;
                songArtImageThumbnailUrl: string;
                shareUrl: string;
                releaseDateWithAbbreviatedMonthForDisplay: string;
                releaseDateForDisplay: string;
                releaseDateComponents: {
                    day: number;
                    month: number;
                    year: number;
                };
                releaseDate: string;
                relationshipsIndexUrl: string;
                recordingLocation: string;
                pyongsCount: number;
                pusherChannel: string;
                published: boolean;
                pendingLyricsEditsCount: number;
                lyricsUpdatedAt: number;
                lyricsPlaceholderReason: any;
                lyricsOwnerId: number;
                language: string;
                isMusic: boolean;
                instrumental: boolean;
                hidden: boolean;
                headerImageUrl: string;
                headerImageThumbnailUrl: string;
                hasInstagramReelAnnotations: any;
                fullTitle: string;
                featuredVideo: boolean;
                facebookShareMessageWithoutUrl: string;
                explicit: boolean;
                embedContent: string;
                descriptionPreview: string;
                description: {
                    markdown: string;
                    html: string;
                };
                customSongArtImageUrl: string;
                customHeaderImageUrl: string;
                commentCount: number;
                artistNames: string;
                appleMusicPlayerUrl: string;
                appleMusicId: string;
                annotationCount: number;
            } | {
                url: string;
                title: string;
                path: string;
                lyricsState: string;
                id: number;
                apiPath: string;
                type: string;
            };
        };
        albumAppearances: {
            [id: string]: {
                song: number;
                currentUserMetadata: {
                    excludedPermissions: any[];
                    permissions: string[];
                };
                number: number;
                type: string;
            };
        };
        albums: {
            [id: string]: {
                tracklist: number[];
                artist: number;
                url: string;
                releaseDateForDisplay: string;
                releaseDateComponents: {
                    day: number;
                    month: number;
                    year: number;
                };
                nameWithArtist: string;
                name: string;
                id: number;
                fullTitle: string;
                coverArtUrl: string;
                coverArtThumbnailUrl: string;
                apiPath: string;
                type: string;
            };
        };
        users: {
            [id: string]: {
                currentUserMetadata: {
                    interactions: {
                        following: boolean;
                    };
                    excludedPermissions: string[];
                    permissions: any[];
                };
                url: string;
                roleForDisplay: string;
                name: string;
                login: string;
                isVerified: boolean;
                isMemeVerified: boolean;
                iq: number;
                id: number;
                humanReadableRoleForDisplay: string;
                headerImageUrl: string;
                avatar: {
                    medium: {
                        boundingBox: {
                            height: number;
                            width: number;
                        };
                        url: string;
                    };
                    small: {
                        boundingBox: {
                            height: number;
                            width: number;
                        };
                        url: string;
                    };
                    thumb: {
                        boundingBox: {
                            height: number;
                            width: number;
                        };
                        url: string;
                    };
                    tiny: {
                        boundingBox: {
                            height: number;
                            width: number;
                        };
                        url: string;
                    };
                };
                apiPath: string;
                aboutMeSummary: string;
                type: string;
            };
        };
        comments: {
            [id: string]: {
                reason: any;
                author: number;
                anonymousAuthor: any;
                currentUserMetadata: {
                    interactions: {
                        vote: any;
                    };
                    excludedPermissions: string[];
                    permissions: any[];
                };
                votesTotal: number;
                pinnedRole: any;
                id: number;
                hasVoters: boolean;
                createdAt: number;
                commentableType: string;
                commentableId: number;
                body: {
                    markdown: string;
                    html: string;
                };
                apiPath: string;
                type: string;
            };
        };
        annotations: {
            [id: string]: {
                verifiedBy: any;
                topComment: number;
                rejectionComment: any;
                createdBy: number;
                cosignedBy: any[];
                authors: {
                    user: number;
                    pinnedRole: any;
                    attribution: number;
                    type: string;
                }[];
                acceptedBy: number;
                currentUserMetadata: {
                    iqByAction: {};
                    interactions: {
                        vote: any;
                        pyong: boolean;
                        cosign: boolean;
                    };
                    excludedPermissions: string[];
                    permissions: any[];
                };
                votesTotal: number;
                verified: boolean;
                url: string;
                twitterShareMessage: string;
                state: string;
                source: any;
                shareUrl: string;
                referentId: number;
                pyongsCount: number;
                proposedEditCount: number;
                pinned: boolean;
                needsExegesis: boolean;
                id: number;
                hasVoters: boolean;
                embedContent: string;
                deleted: boolean;
                customPreview: any;
                createdAt: number;
                community: boolean;
                commentCount: number;
                body: {
                    markdown: string;
                    html: string;
                };
                beingCreated: boolean;
                apiPath: string;
                type: string;
            };
        };
        referents: {
            [id: string]: {
                annotations: number[];
                annotatable: {
                    url: string;
                    type: string;
                    title: string;
                    linkTitle: string;
                    imageUrl: string;
                    id: number;
                    context: string;
                    clientTimestamps: {
                        lyricsUpdatedAt: number;
                        updatedByHumanAt: number;
                    };
                    apiPath: string;
                };
                twitterShareMessage: string;
                trackingPaths: {
                    concurrent: string;
                    aggregate: string;
                };
                currentUserMetadata: {
                    relationships: {};
                    excludedPermissions: string[];
                    permissions: any[];
                };
                verifiedAnnotatorIds: any[];
                url: string;
                songId: number;
                range: {
                    content: string;
                };
                path: string;
                isImage: boolean;
                isDescription: boolean;
                iosAppUrl: string;
                id: number;
                fragment: string;
                classification: string;
                apiPath: string;
                annotatorLogin: string;
                annotatorId: number;
                type: string;
            } | {
                classification: string;
                editorialState: string;
                id: number;
            };
        };
        answers: {
            [id: string]: {
                authors: {
                    user: number;
                    pinnedRole: any;
                    attribution: number;
                    type: string;
                }[];
                answerSource: any;
                currentUserMetadata: {
                    interactions: {
                        vote: any;
                    };
                    excludedPermissions: string[];
                    permissions: any[];
                };
                votesTotal: number;
                id: number;
                hasVoters: boolean;
                editorialState: string;
                createdAt: number;
                body: {
                    markdown: string;
                    html: string;
                };
                type: string;
            };
        };
        questions: {
            [id: string]: {
                author: number;
                answer: number;
                currentUserMetadata: {
                    interactions: {
                        vote: any;
                    };
                    iqByAction: {};
                    excludedPermissions: string[];
                    permissions: any[];
                };
                votesTotal: number;
                url: string;
                state: string;
                pinOrder: number;
                id: number;
                hasVoters: boolean;
                defaultKey: any;
                createdAt: number;
                contributorsCount: number;
                body: string;
                type: string;
            };
        };
        metadataQuestions: {
            [id: string]: {
                question: string;
                path: string;
                id: string;
                type: string;
            };
        };
    };
}
export declare class ScrapedSong {
    readonly data: ScrapedSongData;
    constructor(data: ScrapedSongData);
    /**
     * Parses lyrics of the scraped track.
     * @example const Lyrics = await ScrapedSong.lyrics(true);
     */
    lyrics(removeChorus?: boolean): string;
    static parseLyricsDataBodyChildren(children: ScrapedSongDataLyricsDataBodyChild[]): string;
}
