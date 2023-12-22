import { useRouter } from 'next/router';

import { PricesBlock } from '@/entities/prices-block';
import { useGetMyWishItem } from '@/pages/wish-list-item-page/model';
import { Registered } from '@/shared/components/registered-layout';
import { useCurrentUser } from '@/shared/hooks/use-get-current-user';
import { ArrowLeftIcon } from '@/shared/icons/ArrowLeftIcon';

export const WishListItemPage = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const itemId = typeof router.query.id === 'string' ? router.query.id : null;
  const wish = useGetMyWishItem(itemId);

  return (
    <Registered>
      <button onClick={() => router.back()} className="flex gap-2 mb-2">
        <ArrowLeftIcon />
        Back
      </button>
      {wish.data && user.data ? (
        <div className="flex w-full max-w-6xl bg-white rounded-md px-12 py-8">
          <div className="w-1/2">
            <img
              className="w-full aspect-auto mb-6"
              src={wish.data.imageUrl || '/images/product-image-fallback.svg'}
              alt="Wish list item"
            />
            <a
              target="_blank"
              className="block text-center w-full bg-amber-300 rounded-md px-6 py-2"
              href={wish.data.url}
              rel="noreferrer"
            >
              View source
            </a>
          </div>

          <div className="w-1/2 ml-12">
            <h1 className="text-2xl font-semibold text-[#adadad]">{wish.data.title}</h1>
            {wish.data.description ? <p>{wish.data.description}</p> : null}
            <PricesBlock prices={wish.data.prices} preferredCurrency={user.data.preferredCurrency} />
          </div>
        </div>
      ) : null}
    </Registered>
  );
};
