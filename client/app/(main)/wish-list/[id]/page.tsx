import { WishListItemPage } from '@/pages/wish-list-item-page';

const WishListItemRoute = async ({ params }: { params: { id: string } }) => <WishListItemPage id={params.id} />;

export default WishListItemRoute;