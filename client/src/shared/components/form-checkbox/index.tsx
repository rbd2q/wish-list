import { InputHTMLAttributes, ReactNode } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> &
  Omit<ControllerProps<T>, 'render'> & {
    label?: ReactNode;
  };

export function FormCheckbox<TFieldValues extends FieldValues>(props: Props<TFieldValues>): JSX.Element {
  const { name, defaultValue, rules, shouldUnregister, control, label, ...rest } = props;

  return (
    <label className="flex items-center cursor-pointer">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        shouldUnregister={shouldUnregister}
        aria-label={label}
        render={({ field }) => (
          <input
            className="h-full"
            type="checkbox"
            checked={!!field.value}
            defaultValue={defaultValue}
            {...rest}
            {...field}
          />
        )}
      />
      {label ? <div className="ml-2">{label}</div> : null}
    </label>
  );
}
