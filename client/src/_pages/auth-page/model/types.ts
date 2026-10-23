import { CurrencyEnum } from '@/shared/lib/currency';

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
