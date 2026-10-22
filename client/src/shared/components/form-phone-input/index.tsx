import { InputHTMLAttributes } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import ReactPhoneInput, { type Country } from 'react-phone-number-input';

import { FormError } from '../form-error';
import styles from './form-phone-input.module.scss';

// interface Props {
//   name: string;
//   defaultCountry?: string;
//   validate?: FieldValidator<string>;
// }

type Props<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> &
  Omit<ControllerProps<T>, 'render'> & { defaultCountry?: Country };

export function FormPhoneInput<TFieldValues extends FieldValues>(props: Props<TFieldValues>): React.JSX.Element {
  const { name, defaultValue, rules, shouldUnregister, control, disabled, ...rest } = props;

  const errorId = `${rest.id ?? name}-error`;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field, fieldState }) => (
        <>
          <ReactPhoneInput
            placeholder="+"
            disabled={disabled}
            international
            {...rest}
            {...field}
            aria-invalid={!!fieldState.error}
            aria-describedby={fieldState.error ? errorId : rest['aria-describedby']}
            flagUrl="/images/flags/cfi/3x2/{XX}.svg"
            className={styles.PhoneInput}
          />
          {fieldState.error && <FormError id={errorId}>{fieldState.error.message}</FormError>}
        </>
      )}
    />
  );
}
