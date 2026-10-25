import { CollectionFormPage } from '@/_pages/collection-form-page';

interface EditCollectionRouteProps {
  params: Promise<{ id: string }>;
}

const EditCollectionRoute = async ({ params }: EditCollectionRouteProps) => {
  const { id } = await params;

  return <CollectionFormPage id={id} />;
};

export default EditCollectionRoute;
