import type { UserResource } from '@/entities/session';

const MAX_INITIALS_LENGTH = 2;

export const getUserInitials = ({ name, email }: Pick<UserResource, 'name' | 'email'>): string => {
  const normalizedName = name?.trim();

  if (!normalizedName) {
    return email.slice(0, 1).toUpperCase();
  }

  return normalizedName
    .split(/\s+/)
    .slice(0, MAX_INITIALS_LENGTH)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
};
