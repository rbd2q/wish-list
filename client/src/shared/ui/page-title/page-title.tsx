import Head from 'next/head';
import { FC, useMemo } from 'react';

interface Props {
  title?: string;
}

export const PageTitle: FC<Props> = ({ title }) => {
  const completeTitle = useMemo(() => {
    const parts: string[] = [];

    if (title) {
      parts.push(title);
    }
    parts.push('My Wish List');

    return parts.join(' / ');
  }, [title]);

  return (
    <Head>
      <title>{completeTitle}</title>
    </Head>
  );
};
