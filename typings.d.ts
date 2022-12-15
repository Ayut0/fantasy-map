//Common types shared in several components

import { SliderUnstyledMarkLabelSlotProps } from "@mui/base";

interface Location {
  lat: number;
  lng: number;
}
export interface FavoriteList {
  id: string;
  name: string;
  image: string;
  description: string;
  rating?: number;
  userId?: number;
}

export interface FavoritePlace {
  address: string;
  description: string;
  id: number;
  location: Location;
  name: string;
  picture: string

}

export interface User {
  name: string;
  id: number;
  email: string;
  profilePicture: string;
  location: string;
  description: string;
}

export interface Review {
  id: number;
  content?: string;
  stars?: number;
  userId: number;
  placeId: number;
  user?: User;
  place: Place;
  profilePicture?: string;
}


export interface Place {
  address: string;
  averageStars?: number;
  description: string;
  id: number;
  name: string;
  picture?: string;
  location: Location;
  userId: number;
  reviews?: Review[];
  User?: User;
  favorite?: boolean;
}

export interface PlaceInList {
  id: number;
  name: string;
  address: string;
  description: string;
  picture: string;
  location: Location;
  averageStars?: number;
}

export interface Category {
  id: number;
  name: string;
  picture: string;
}

export interface PopularList {
  description: string;
  id: number;
  name: string;
  picture: string;
  user?: any;
}

export interface List {
  id: number;
  description: string;
  name: string;
  picture: string;
  places: Place[];
  userId?: number;
  categoryId?: number;
  deleted?: boolean;
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
  id: number;
  name: string;
  description?: string;
  picture?: string;
  averageStars?: number;
  user?: User;
}

export interface MobileMenu {
  id: number;
  name: string;
  href: string;
}
