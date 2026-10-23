import { ProfileContent } from './ui';

export const ProfilePage = () => (
  <div className="bg-white mx-auto max-w-xl rounded-md py-4 px-8">
    <h1 className="text-2xl font-semibold">Profile</h1>
    <div className="mt-6">
      <ProfileContent />
    </div>
  </div>
);
