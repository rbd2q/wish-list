'use client';

import { Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';
import { ControllerProps, FieldValues } from 'react-hook-form';

import { FormInput } from '../form-input';

type FormPasswordInputProps<T extends FieldValues> = Omit<ControllerProps<T>, 'render'> & {
  id: string;
  autoComplete: 'current-password' | 'new-password';
  placeholder?: string;
};

export const FormPasswordInput = <T extends FieldValues>(props: FormPasswordInputProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <FormInput
      {...props}
      type={isVisible ? 'text' : 'password'}
      required
      autoCapitalize="none"
      spellCheck={false}
      startContent={<Lock className="size-4" aria-hidden="true" />}
      endContent={
        <button
          type="button"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-controls={props.id}
          className="-mr-2 grid size-11 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
        </button>
      }
    />
  );
};
