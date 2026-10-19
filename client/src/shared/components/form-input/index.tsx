'use client';

import { InputHTMLAttributes } from 'react';
import { ControllerProps, FieldValues, useController } from 'react-hook-form';

import { Input } from '../input';

type FormInputProps<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  };

export function FormInput<T extends FieldValues>(props: FormInputProps<T>): React.JSX.Element {
  const { name, control, defaultValue, rules, shouldUnregister, startContent, endContent, ...rest } = props;
  const { field, fieldState } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <Input
      {...rest}
      {...field}
      startContent={startContent}
      endContent={endContent}
      value={field.value ?? ''}
      isInvalid={!!fieldState.error}
    />
  );
}
