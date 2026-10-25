import { Fragment, type TextareaHTMLAttributes } from 'react';
import { type ControllerProps, type FieldValues, useController } from 'react-hook-form';

import { FormError } from '../form-error';
import styles from './form-textarea.module.scss';

type FormTextareaProps<T extends FieldValues> = TextareaHTMLAttributes<HTMLTextAreaElement> &
  Omit<ControllerProps<T>, 'render'>;

export const FormTextarea = <T extends FieldValues>(props: FormTextareaProps<T>): React.JSX.Element => {
  const { name, defaultValue, rules, shouldUnregister, control, ...rest } = props;
  const {
    field,
    fieldState: { error },
  } = useController({ name, defaultValue, rules, shouldUnregister, control });
  const errorId = `${rest.id ?? name}-error`;

  return (
    <Fragment>
      <textarea
        className={styles.textarea}
        rows={4}
        {...rest}
        {...field}
        value={field.value ?? ''}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : rest['aria-describedby']}
      />
      {error && <FormError id={errorId}>{error.message}</FormError>}
    </Fragment>
  );
};
