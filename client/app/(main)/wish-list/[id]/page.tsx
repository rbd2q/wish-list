import type { Metadata } from 'next';

import { WishListItemPage } from '@/_pages/wish-list-item-page';

export const metadata: Metadata = {
  title: 'Wish',
};

export default async function WishListItemRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <WishListItemPage id={id} />;
}
