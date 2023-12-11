import { InputHTMLAttributes } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

import styles from './form-input.module.css';

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & Omit<ControllerProps<T>, 'render'>;

export function FormInput<TFieldValues extends FieldValues>(props: Props<TFieldValues>): JSX.Element {
  const { name, defaultValue, rules, shouldUnregister, control, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => (
        <input
          className={styles.Input}
          {...rest}
          {...field}
          value={typeof field.value === 'undefined' ? '' : field.value}
        />
      )}
    />
  );
}
