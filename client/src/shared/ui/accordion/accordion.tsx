import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ReactNode, useState } from 'react';

import { FCWithChildren } from '@/shared/lib/react';

import styles from './accordion.module.scss';

interface Props {
  title: ReactNode;
  icon?: ReactNode;
  defaultOpened?: boolean;
}

export const Accordion: FCWithChildren<Props> = ({ defaultOpened, title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={clsx(styles.accordion, isOpen && styles['accordion--opened'])}>
      <button
        type="button"
        onClick={handleToggle}
        className={clsx(styles.accordion__header, icon && styles['accordion__header--has-icon'])}>
        {icon ? <div className={styles.accordion__icon}>{icon}</div> : null}
        <div className={styles.accordion__title}>{title}</div>
        <div className={styles.accordion__arrow}>
          <ChevronDown size={24} aria-hidden="true" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            className={styles.accordion__content}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3 }}>
            <div className={styles['accordion__content--before']} />
            {children}
            <div className={styles['accordion__content--after']} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
