import type { Metadata } from 'next';

import { ProfilePage } from '@/_pages/profile-page';

export const metadata: Metadata = {
  title: 'Profile',
};

const ProfileRoute = () => <ProfilePage />;

export default ProfileRoute;
