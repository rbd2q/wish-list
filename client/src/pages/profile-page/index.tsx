import { useCurrentUser } from '@/pages/profile-page/model';
import { Accordion } from '@/shared/components/accordion';
import { Registered } from '@/shared/components/registered-layout';

export function ProfilePage() {
  const currentUser = useCurrentUser();

  return (
    <Registered>
      <div className="bg-white mx-auto max-w-xl rounded-md py-4 px-8">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="mt-6">
          {currentUser.data ? <div>{currentUser.data?.email}</div> : null}
          <Accordion title="Email">Some hidden content</Accordion>
        </div>
      </div>
    </Registered>
  );
}
