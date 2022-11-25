//Common types shared in several components

import { SliderUnstyledMarkLabelSlotProps } from "@mui/base";

export interface FavoriteList {
    id: string;
    name: string;
    image: string;
    description: string;
    rating?: number;
    userId?: number;
}

export interface Review {
    id: number;
    content?: string;
    stars?: number;
    userId: number;
    placeId: number
}

interface Location {
    lat: number ;
    lng: number;
}

export interface Place{
    address: string;
    averageStars?: number;
    description: string;
    id?: number;
    name: string;
    picture?: string;
    location: Location;
    userId: number;
    reviews? : Review[]
}

export interface List{
    description: string;
    id: number;
    name: string;
    picture: string;
    places: Place[]
}

export interface Marker {
    index: number;
    location: Location;
    name: string;
}
  
export interface MapCenter {
    center: {
      lat: number;
      lng: number;
    };
    zoom: number;
}
  
export interface ListCard {
    name: string;
    description?: string;
    picture?: string;
    averageStars?: number
}