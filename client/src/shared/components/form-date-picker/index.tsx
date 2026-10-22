'use client';

import { ControllerProps, FieldValues, useController } from 'react-hook-form';

import { DatePicker } from '../date-picker';
import { FormError } from '../form-error';

type FormDatePickerProps<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & {
  id?: string;
};

export function FormDatePicker<T extends FieldValues>(props: FormDatePickerProps<T>): React.JSX.Element {
  const { name, control, defaultValue, rules, shouldUnregister, id, ...rest } = props;
  const { field, fieldState } = useController({ name, control, defaultValue, rules, shouldUnregister });

  const errorId = `${id ?? name}-error`;

  return (
    <>
      <DatePicker
        id={id}
        value={field.value ?? null}
        onChange={(value) => field.onChange(value ?? '')}
        isInvalid={!!fieldState.error}
        isDisabled={field.disabled}
        aria-describedby={fieldState.error ? errorId : undefined}
        aria-labelledby={id ? `${id}-label` : undefined}
        name={field.name}
        aria-label={id ? undefined : field.name}
        {...rest}
      />
      {fieldState.error && <FormError id={errorId}>{fieldState.error.message}</FormError>}
    </>
  );
}
