import type { Metadata } from 'next';

import { AddWishPage } from '@/_pages/add-wish-page';

export const metadata: Metadata = {
  title: 'Edit Wish',
};

export default async function EditWishRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <AddWishPage id={id} />;
}
