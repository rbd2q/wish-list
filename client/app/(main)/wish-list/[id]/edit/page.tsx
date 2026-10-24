import { AddWishPage } from '@/_pages/add-wish-page';

export default async function EditWishRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <AddWishPage id={id} />;
}
