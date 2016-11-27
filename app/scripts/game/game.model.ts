export interface Map {
    name: string;
    image: string;
}

export interface Game {
    $key: string;
    logo: string;
    image: string;
    background: string;
    name: string;
    maps: Map[];
}