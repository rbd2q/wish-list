import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ReactNode, useState } from 'react';

import { FCWithChildren } from '@/shared/lib/react';

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
    <div className={clsx('accordion', isOpen && 'accordion--opened')}>
      <button onClick={handleToggle} className={clsx('accordion__header', icon && 'accordion__header--has-icon')}>
        {icon ? <div className="accordion__icon">{icon}</div> : null}
        <div className="accordion__title">{title}</div>
        <div className="accordion__arrow">
          <ChevronDown size={24} aria-hidden="true" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            className="accordion__content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3 }}>
            <div className="accordion__content--before" />
            {children}
            <div className="accordion__content--after" />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
