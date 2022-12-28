import { FC, useMemo } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { WishListIcon } from '../../icons/WishListIcon';
import { ProfileIcon } from '../../icons/ProfileIcon';
import { WalletIcon } from '../../icons/WalletIcon';
import clsx from 'clsx';
import { AVATAR_EMPTY } from '../../utils/constants';
import { Dropdown } from '../dropdown';

export const Header: FC = () => {
  const router = useRouter();

  const avatarStyle = useMemo(
    () => ({
      backgroundImage: `url("${AVATAR_EMPTY}")`,
    }),
    [],
  );

  return (
    <div className="w-full bg-white px-12 py-3 flex items-center justify-between">
      <div className="flex">
        <Link href="/" className="flex items-center">
          <img src="images/wish-list-logo.jpg" alt="logo" className={styles.logo} />
          <span className="font-bold">Wishlist</span>
        </Link>
        <div className="flex gap-12 ml-20">
          <Link
            href="/wish-list"
            className={clsx(
              'flex gap-2 px-2 py-1 rounded-md text-sm items-center',
              router.pathname === '/wish-list' && 'bg-[#edeef0]',
            )}
          >
            <WishListIcon />
            Wishlist
          </Link>
          <Link
            href="/profile"
            className={clsx(
              'flex gap-2 px-2 py-1 rounded-md text-sm items-center',
              router.pathname === '/profile' && 'bg-[#edeef0]',
            )}
          >
            <ProfileIcon />
            Profile
          </Link>
          <Link
            href="/budget"
            className={clsx(
              'flex gap-2 px-2 py-1 rounded-md text-sm items-center',
              router.pathname === '/budget' && 'bg-[#edeef0]',
            )}
          >
            <WalletIcon />
            Budget
          </Link>
        </div>
      </div>
      <div>
        <Dropdown>
          <img alt="" style={avatarStyle} className="w-6 h-6 rounded-full" />
        </Dropdown>
      </div>
    </div>
  );
};
