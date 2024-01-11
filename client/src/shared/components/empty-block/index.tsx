import { FC } from 'react';

import { TumbleweedIcon } from '@/shared/icons/TumbleweedIcon';

import styles from './empty-block.module.css';

export const EmptyBlock: FC = () => (
  <div className="m-auto flex items-center flex-col text-[#858A9C]">
    <span className={styles.tumbleweedWrapper}>
      <span className={styles.tumbleweed}>
        <TumbleweedIcon />
      </span>
    </span>
    <span className="text-lg font-bold mt-3 mb-12">It is empty so far :(</span>
  </div>
);
