import type { Metadata } from 'next';

import { CollectionFormPage } from '@/_pages/collection-form-page';

export const metadata: Metadata = {
  title: 'New Collection',
};

const NewCollectionRoute = () => <CollectionFormPage />;

export default NewCollectionRoute;
