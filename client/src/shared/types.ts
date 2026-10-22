import { FC, PropsWithChildren } from 'react';

export type FCWithChildren<P = object> = FC<PropsWithChildren<P>>;

export type CurrencyEnum = 'USD' | 'BYN' | 'RUB';
export type CurrencySignEnum = '$' | 'BYN' | '₽';
export type CurrencyType = {
  value: CurrencyEnum;
  name: string;
  sign: CurrencySignEnum;
};

export type PriceType = Record<CurrencyEnum, number>;

export interface WishResource {
  id: string;
  title: string;
  description: string;
  prices: PriceType;
  image?: string;
}

export interface UserResource {
  id: string;
  email: string;
  wishes: string[];
  preferredCurrency: CurrencyEnum;
  name?: string;
  birthDate?: string;
  phone?: string;
}

export interface SignInResource {
  email: string;
  password: string;
}

export interface SignUpResource extends SignInResource {
  name: string;
  preferredCurrency: CurrencyEnum;
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
  id: string;
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
