'use client';

import { ListBox, Select as HeroUISelect } from '@heroui/react';
import clsx from 'clsx';
import { type AriaAttributes, useMemo } from 'react';

import styles from './select.module.scss';

export interface SelectOption {
  value: string;
  name: string;
}

export interface SelectProps extends Pick<AriaAttributes, 'aria-describedby' | 'aria-labelledby'> {
  options: SelectOption[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  fullWidth?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

// TODO: Refactor component
export const Select = ({
  options,
  value = null,
  onChange,
  placeholder = 'Select an option',
  isDisabled,
  isInvalid,
  fullWidth = true,
  id,
  name,
  className,
  ...ariaProps
}: SelectProps): React.JSX.Element => {
  const items = useMemo(
    () =>
      options.map((option) => (
        <ListBox.Item key={option.value} id={option.value} textValue={option.name} className={styles.option}>
          {option.name}
        </ListBox.Item>
      )),
    [options],
  );

  return (
    <HeroUISelect
      id={id}
      name={name}
      className={clsx(styles.select, fullWidth && 'w-full', className)}
      data-invalid={isInvalid ? 'true' : undefined}
      placeholder={placeholder}
      selectedKey={value ?? null}
      onSelectionChange={(key) => onChange?.(key != null ? String(key) : null)}
      isDisabled={isDisabled}
      fullWidth={fullWidth}
      aria-label={ariaProps['aria-labelledby'] ? undefined : (value ?? undefined)}
      {...ariaProps}>
      <HeroUISelect.Trigger className={styles.selectTrigger}>
        <HeroUISelect.Value />
        <HeroUISelect.Indicator />
      </HeroUISelect.Trigger>
      <HeroUISelect.Popover className={styles.popover}>
        <ListBox className={styles.listBox}>{items}</ListBox>
      </HeroUISelect.Popover>
    </HeroUISelect>
  );
};
