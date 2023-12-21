import { FC } from 'react';

import { WishListItemType } from '@/shared/types';

interface Props {
  item: WishListItemType;
}

export const ItemCard: FC<Props> = ({ item }) => (
  <button
    className="relative flex items-center justify-center w-[calc(33.3%-12px)] aspect-square border border-gray-300 rounded-lg bg-white bg-contain bg-no-repeat bg-center group"
    style={{
      backgroundImage: item.imageUrl ? `url(${item?.imageUrl})` : 'url("/images/product-image-fallback.svg")',
    }}
  >
    <div className="hidden absolute top-0 bottom-0 right-0 left-0 bg-black opacity-50 group-hover:block" />
    <span className="hidden group-hover:block text-white z-10">{item.title}</span>
  </button>
);
