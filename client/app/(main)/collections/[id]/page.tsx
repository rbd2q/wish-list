import { CollectionPage } from '@/_pages/collection-page';

interface CollectionRouteProps {
  params: Promise<{ id: string }>;
}

const CollectionRoute = async ({ params }: CollectionRouteProps) => {
  const { id } = await params;

  return <CollectionPage id={id} />;
};

export default CollectionRoute;
