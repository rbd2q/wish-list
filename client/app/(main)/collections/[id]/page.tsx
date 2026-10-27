import type { Metadata } from 'next';

import { CollectionPage } from '@/_pages/collection-page';

export const metadata: Metadata = {
  title: 'Collection',
};

interface CollectionRouteProps {
  params: Promise<{ id: string }>;
}

const CollectionRoute = async ({ params }: CollectionRouteProps) => {
  const { id } = await params;

  return <CollectionPage id={id} />;
};

export default CollectionRoute;
