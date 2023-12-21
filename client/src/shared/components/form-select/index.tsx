import { InputHTMLAttributes } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

import styles from './form-select.module.css';

export interface SelectProps {
  id?: string;
  value?: string;
  onChange?: (value?: string) => void;
  options: any[];
  placeholder?: string;
  disabled?: boolean;
  deletable?: boolean;
}

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLSelectElement> &
  SelectProps &
  Omit<ControllerProps<T>, 'render'>;

export function FormSelect<TFieldValues extends FieldValues>(props: Props<TFieldValues>): JSX.Element {
  const { name, defaultValue, rules, shouldUnregister, control, options, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => (
        <select
          className={styles.Select}
          defaultValue={defaultValue}
          {...rest}
          {...field}
          value={typeof field.value === 'undefined' ? '' : field.value}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} label={option.name} />
          ))}
        </select>
      )}
    />
  );
}
