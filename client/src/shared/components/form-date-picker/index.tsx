'use client';

import { ControllerProps, FieldValues, useController } from 'react-hook-form';

import { DatePicker } from '../date-picker';

type FormDatePickerProps<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & {
  id?: string;
};

export function FormDatePicker<T extends FieldValues>(props: FormDatePickerProps<T>): JSX.Element {
  const { name, control, defaultValue, rules, shouldUnregister, id, ...rest } = props;
  const { field, fieldState } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <DatePicker
      id={id}
      value={field.value ?? null}
      onChange={(value) => field.onChange(value ?? '')}
      isInvalid={!!fieldState.error}
      name={field.name}
      aria-label={field.name}
      {...rest}
    />
  );
}
