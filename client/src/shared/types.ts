import { FC, PropsWithChildren } from 'react';

export type FCWithChildren<P = {}> = FC<PropsWithChildren<P>>;

export interface AuthFormResource {
  email: string;
  password: string;
}
