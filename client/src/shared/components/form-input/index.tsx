'use client';

import { InputHTMLAttributes } from 'react';
import { ControllerProps, FieldValues, useController } from 'react-hook-form';

import { FormError } from '../form-error';
import { Input } from '../input';

type FormInputProps<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  };

export function FormInput<T extends FieldValues>(props: FormInputProps<T>): React.JSX.Element {
  const { name, control, defaultValue, rules, shouldUnregister, startContent, endContent, ...rest } = props;
  const { field, fieldState } = useController({ name, control, defaultValue, rules, shouldUnregister });

  const errorId = `${rest.id ?? name}-error`;

  return (
    <>
      <Input
        {...rest}
        {...field}
        startContent={startContent}
        endContent={endContent}
        value={field.value ?? ''}
        isInvalid={!!fieldState.error}
        aria-invalid={!!fieldState.error}
        aria-describedby={fieldState.error ? errorId : rest['aria-describedby']}
      />
      {fieldState.error && <FormError id={errorId}>{fieldState.error.message}</FormError>}
    </>
  );
}
