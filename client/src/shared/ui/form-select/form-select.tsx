'use client';

import { Fragment } from 'react';
import { ControllerProps, FieldValues, useController } from 'react-hook-form';

import { FormError } from '../form-error';
import { Select, type SelectOption } from '../select';

type FormSelectProps<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & {
  options: SelectOption[];
  placeholder?: string;
  id?: string;
};

export function FormSelect<T extends FieldValues>(props: FormSelectProps<T>): React.JSX.Element {
  const { name, control, defaultValue, rules, shouldUnregister, options, placeholder, id, ...rest } = props;
  const { field, fieldState } = useController({ name, control, defaultValue, rules, shouldUnregister });

  const errorId = `${id ?? name}-error`;

  return (
    <Fragment>
      <Select
        id={id}
        options={options}
        placeholder={placeholder}
        value={field.value ?? null}
        onChange={(value) => field.onChange(value ?? '')}
        isInvalid={!!fieldState.error}
        isDisabled={field.disabled}
        aria-describedby={fieldState.error ? errorId : undefined}
        aria-labelledby={id ? `${id}-label` : undefined}
        name={field.name}
        {...rest}
      />
      {fieldState.error && <FormError id={errorId}>{fieldState.error.message}</FormError>}
    </Fragment>
  );
}
