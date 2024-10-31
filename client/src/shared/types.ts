import { FC, PropsWithChildren } from 'react';

export type FCWithChildren<P = {}> = FC<PropsWithChildren<P>>;

export type CurrencyEnum = 'USD' | 'BYN' | 'RUB';
export type CurrencySignEnum = '$' | 'BYN' | '₽';
export type CurrencyType = {
  value: CurrencyEnum;
  name: string;
  sign: CurrencySignEnum;
};

export type PriceType = Record<CurrencyEnum, number>;

export interface WishResource {
  id: number;
  title: string;
  description: string;
  prices: PriceType;
  image?: string;
}

export interface UserResource {
  _id: string;
  email: string;
  wishes: WishResource[];
  preferredCurrency: CurrencyEnum;
  name?: string;
  birthDate?: string;
  phone?: string;
}

export interface AuthFormResource {
  email: string;
  password: string;
  name: string;
  currency: string;
  birthDate?: string;
  phone?: string;
}

export interface AddItemFormResource {
  link?: string;
  title: string;
  isHidden: boolean;
  description?: string;
  url?: string;
  price?: string;
  primaryCurrency?: string;
  imageUrl?: string;
  tags?: string[];
  isCompleted?: boolean;
}

export interface WishListItemType {
  _id: string;
  title: string;
  isHidden: boolean;
  prices: PriceType;
  primaryCurrency: CurrencyEnum;
  userId: string;
  isCompleted: boolean;
  date: Date;
  description?: string;
  url?: string;
  imageUrl?: string;
  tags?: string[];
}

export interface ParsedWishListItem {
  title: string;
  price: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  images?: Array<string>;
}
