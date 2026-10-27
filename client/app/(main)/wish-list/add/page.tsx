import type { Metadata } from 'next';

import { AddWishPage } from '@/_pages/add-wish-page';

export const metadata: Metadata = {
  title: 'Add Wish',
};

const AddWishRoute = () => <AddWishPage />;

export default AddWishRoute;
