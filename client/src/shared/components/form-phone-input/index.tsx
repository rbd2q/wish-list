import { InputHTMLAttributes } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import ReactPhoneInput from 'react-phone-number-input';

import styles from './form-phone-input.module.scss';

// interface Props {
//   name: string;
//   defaultCountry?: string;
//   validate?: FieldValidator<string>;
// }

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & Omit<ControllerProps<T>, 'render'>;

export function FormPhoneInput<TFieldValues extends FieldValues>(props: Props<TFieldValues>): JSX.Element {
  const { name, defaultValue, rules, shouldUnregister, control, disabled, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field }) => (
        <ReactPhoneInput
          placeholder="+"
          disabled={disabled}
          international
          {...rest}
          {...field}
          flagUrl="/images/flags/cfi/3x2/{XX}.svg"
          className={styles.PhoneInput}
        />
      )}
    />
  );
}
