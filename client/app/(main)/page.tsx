import type { Metadata } from 'next';

import { WishListPage } from '@/_pages/wish-list-page';

export const metadata: Metadata = {
  title: 'My Wishlist',
};

const Home = () => <WishListPage />;

export default Home;
