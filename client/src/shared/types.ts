import { FC, PropsWithChildren } from 'react';

export type FCWithChildren<P = {}> = FC<PropsWithChildren<P>>;

export interface WishResource {
  id: number;
  title: string;
  description: string;
  price: string;
  image?: string;
}

export interface UserResource {
  id: string;
  email: string;
  wishes: WishResource[];
  name?: string;
}

export interface AuthFormResource {
  email: string;
  password: string;
  name?: string;
}

export interface AddItemFormResource {
  title: string;
  isHidden: boolean;
  description?: string;
  url?: string;
  price?: string;
  currency?: string;
  imageUrl?: string;
  tags?: string[];
}

export interface WishListItemType {
  _id: string;
  title: string;
  isHidden: boolean;
  description?: string;
  url?: string;
  price?: string;
  currency?: string;
  imageUrl?: string;
  tags?: string[];
  userId?: string;
}
