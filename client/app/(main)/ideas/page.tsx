import type { Metadata } from 'next';

import { IdeasPage } from '@/_pages/ideas-page';

export const metadata: Metadata = {
  title: 'Ideas',
};

const IdeasRoute = () => <IdeasPage />;

export default IdeasRoute;
