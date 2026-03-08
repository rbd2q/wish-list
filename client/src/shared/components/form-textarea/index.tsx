import { InputHTMLAttributes } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

import styles from './form-textarea.module.scss';

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLTextAreaElement> & Omit<ControllerProps<T>, 'render'>;

export function FormTextarea<TFieldValues extends FieldValues>(props: Props<TFieldValues>): JSX.Element {
  const { name, defaultValue, rules, shouldUnregister, control, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => (
        <textarea
          className={styles.textarea}
          rows={4}
          {...rest}
          {...field}
          value={typeof field.value === 'undefined' ? '' : field.value}
        />
      )}
    />
  );
}
