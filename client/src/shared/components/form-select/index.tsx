'use client';

import { ControllerProps, FieldValues, useController } from 'react-hook-form';

import { Select, type SelectOption } from '../select';

type FormSelectProps<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & {
  options: SelectOption[];
  placeholder?: string;
  id?: string;
};

export function FormSelect<T extends FieldValues>(props: FormSelectProps<T>): JSX.Element {
  const { name, control, defaultValue, rules, shouldUnregister, options, placeholder, id, ...rest } = props;
  const { field, fieldState } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <Select
      id={id}
      options={options}
      placeholder={placeholder}
      value={field.value ?? null}
      onChange={(value) => field.onChange(value ?? '')}
      isInvalid={!!fieldState.error}
      name={field.name}
      {...rest}
    />
  );
}
