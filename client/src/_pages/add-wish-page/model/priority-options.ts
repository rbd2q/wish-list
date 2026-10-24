import { WishPriority } from '@/entities/wish';

export const PRIORITY_OPTIONS: Array<{ value: WishPriority; label: string }> = [
  { value: WishPriority.LOW, label: 'Low' },
  { value: WishPriority.MEDIUM, label: 'Medium' },
  { value: WishPriority.HIGH, label: 'High' },
];
