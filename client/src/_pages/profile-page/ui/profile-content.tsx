import { Fragment } from 'react';

import { useCurrentUser } from '@/entities/session';
import { Accordion } from '@/shared/ui/accordion';
import { RequestError } from '@/shared/ui/request-error';

export const ProfileContent = () => {
  const { data: currentUser, isLoading, isError, refetch } = useCurrentUser();

  const handleRetry = () => {
    void refetch();
  };

  if (isLoading) {
    return <p role="status">Loading profile…</p>;
  }

  if (isError) {
    return <RequestError message="Could not load your profile." onRetry={handleRetry} />;
  }

  if (!currentUser) {
    return <p>Profile unavailable.</p>;
  }

  return (
    <Fragment>
      <div>{currentUser.email}</div>
      <Accordion title="Email">Some hidden content</Accordion>
    </Fragment>
  );
};
