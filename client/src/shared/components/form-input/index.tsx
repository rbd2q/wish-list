import { Controller, ControllerProps, FieldValues, useFormState } from 'react-hook-form';
import { FormError } from '../form-error';
// @ts-ignore
import get from 'lodash/get';
import { InputHTMLAttributes } from 'react';
import styles from './form-input.module.css';

type Props<TFieldValues extends FieldValues = FieldValues> = InputHTMLAttributes<HTMLInputElement> &
  Omit<ControllerProps<TFieldValues>, 'render'>;

export function FormInput<TFieldValues extends FieldValues = FieldValues>(props: Props<TFieldValues>): JSX.Element {
  const { name, defaultValue, rules, shouldUnregister, control, color, ...rest } = props;
  const { errors } = useFormState<TFieldValues>({ control });
  const errorMessage = get(errors, `${name}.message`);

  return (
    <>
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
      {errorMessage ? <FormError>{errorMessage}</FormError> : null}
    </>
  );
}
