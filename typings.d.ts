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
    id: string;
    image?: string;
    name: string;
    content: string;
    star?: number;
    userId?: number;
}

interface Location {
    lat: number ;
    lng: number;
}

interface Place{
    address: string;
    averageStars: number;
    description: string;
    id?: number;
    name: string;
    picture?: string;
    location: Location;
    categoryId?: number;
    userId: number
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
    averageStars: number
}