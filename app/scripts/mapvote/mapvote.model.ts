export interface MapVote {
    gameId: string;
    bestOf: number;
    banned: Vote[];
    selected: Vote[];
    $key?: string;
}

export interface Vote {
    name: string;
}