import { usePositioner } from 'masonic';
import { useLayoutEffect, useReducer, useRef, useState } from 'react';

import type { WishListItemType } from '@/entities/wish';

export const useIdeasMasonry = (items: WishListItemType[]) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [, updateLayout] = useReducer((revision: number) => revision + 1, 0);
  const positioner = usePositioner({ width, columnWidth: 240, columnGutter: 16, maxColumnCount: 3 }, [items]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const measure = () => {
      setWidth(container.clientWidth);

      if (!width) {
        return;
      }

      const updates: number[] = [];
      let hasNewItems = false;

      Array.from(container.children).forEach((element, index) => {
        const height = element.getBoundingClientRect().height;
        const previous = positioner.get(index);

        if (!previous) {
          positioner.set(index, height);
          hasNewItems = true;
        } else if (previous.height !== height) {
          updates.push(index, height);
        }
      });

      if (updates.length) {
        positioner.update(updates);
      }

      if (hasNewItems || updates.length) {
        updateLayout();
      }
    };

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    Array.from(container.children).forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [items, positioner, width]);

  const isPositioned = positioner.size() === items.length;
  const height = isPositioned ? positioner.estimateHeight(items.length, 300) : undefined;
  const positions = isPositioned ? positioner.all() : [];
  const columnWidth = positioner.columnWidth || undefined;

  return { containerRef, height, positions, columnWidth };
};
