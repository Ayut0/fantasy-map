//Common types shared in several components

export interface FavoriteList {
    id: string;
    name: string;
    image: string;
    description: string;
    rating?: number;
    userId?: number;
}

export interface Review {
    id: string;
    image?: string;
    name: string;
    content: string;
    star?: number;
    userId?: number;
}
