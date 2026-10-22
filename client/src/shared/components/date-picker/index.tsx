'use client';

import { Calendar, DateField, DatePicker as HeroUIDatePicker } from '@heroui/react';
import type { CalendarDate } from '@internationalized/date';
import { parseDate } from '@internationalized/date';
import clsx from 'clsx';

import styles from './date-picker.module.scss';

export interface DatePickerProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

// TODO: Move to utils
function toDateValue(str: string | null | undefined): CalendarDate | null {
  if (str == null || str === '') return null;
  try {
    return parseDate(str);
  } catch {
    return null;
  }
}

// TODO: Refactor component, fix calendar view
export function DatePicker({
  value,
  onChange,
  isDisabled,
  isInvalid,
  id,
  name,
  className,
  ...restProps
}: DatePickerProps): React.JSX.Element {
  const dateValue = toDateValue(value ?? null);

  return (
    <HeroUIDatePicker
      id={id}
      name={name}
      className={clsx(styles.datePicker, className)}
      data-invalid={isInvalid ? 'true' : undefined}
      value={dateValue}
      onChange={(v) => onChange?.(v ? v.toString() : null)}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      {...restProps}
    >
      <DateField.Group className={styles.datePicker__group} fullWidth>
        <DateField.Input>
          {(segment) => <DateField.Segment className={styles.datePicker__value} segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <HeroUIDatePicker.Trigger>
            <HeroUIDatePicker.TriggerIndicator className={styles.datePicker__triggerIndicator} />
          </HeroUIDatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <HeroUIDatePicker.Popover>
        <Calendar aria-label="Choose date">
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody />
          </Calendar.YearPickerGrid>
          <Calendar.Grid>
            <Calendar.GridHeader>{(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}</Calendar.GridHeader>
            <Calendar.GridBody>{(date) => <Calendar.Cell date={date} />}</Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
      </HeroUIDatePicker.Popover>
    </HeroUIDatePicker>
  );
}
