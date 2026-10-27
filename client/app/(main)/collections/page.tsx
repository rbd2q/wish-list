import type { Metadata } from 'next';

import { CollectionsPage } from '@/_pages/collections-page';

export const metadata: Metadata = {
  title: 'Collections',
};

const CollectionsRoute = () => <CollectionsPage />;

export default CollectionsRoute;
