import { CurrencyEnum } from '@/shared/lib/currency';

export interface UserResource {
  id: string;
  email: string;
  wishes: string[];
  preferredCurrency: CurrencyEnum;
  name?: string;
  birthDate?: string;
  phone?: string;
}
