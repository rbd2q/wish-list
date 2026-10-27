import type { Metadata } from 'next';

import { CollectionFormPage } from '@/_pages/collection-form-page';

export const metadata: Metadata = {
  title: 'Edit Collection',
};

interface EditCollectionRouteProps {
  params: Promise<{ id: string }>;
}

const EditCollectionRoute = async ({ params }: EditCollectionRouteProps) => {
  const { id } = await params;

  return <CollectionFormPage id={id} />;
};

export default EditCollectionRoute;
