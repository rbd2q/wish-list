import { FC, PropsWithChildren } from 'react';

export type FCWithChildren<P = {}> = FC<PropsWithChildren<P>>;

export interface WishResource {
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
