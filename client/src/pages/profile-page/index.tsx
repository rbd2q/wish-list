import { Accordion } from '@/shared/components/accordion';
import { Registered } from '@/shared/components/registered-layout';

export function ProfilePage() {
  return (
    <Registered>
      <div className="bg-white mx-auto max-w-xl rounded-md py-4 px-8">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div className="mt-6">
          <div>123</div>
          <Accordion title="Email">Some hidden content</Accordion>
        </div>
      </div>
    </Registered>
  );
}
