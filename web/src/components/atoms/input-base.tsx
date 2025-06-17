'use client';

import { Field, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { forwardRef, ReactNode, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export type InputBaseProps = {
  label?: string;
  error?: string;
  icon?: ReactNode;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
};

export const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    {
      label,
      error,
      icon,
      type = 'text',
      placeholder,
      disabled,
      value,
      onChange,
      name,
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = useState(false);

    const isPassword = type === 'password';

    return (
      <Field.Root invalid={!!error} required={!!label}>
        {label && <Field.Label>{label}</Field.Label>}

        <InputGroup
          startElement={icon && icon}
          endElement={
            isPassword ? (
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Mostrar senha"
                color={error ? 'border.error' : 'border.default'}
                onClick={() => setIsVisible((v) => !v)}
              >
                {isVisible ? <FiEyeOff /> : <FiEye />}
              </IconButton>
            ) : null
          }
        >
          <Input
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            type={isPassword && !isVisible ? 'password' : 'text'}
            placeholder={placeholder}
            disabled={disabled}
          />
        </InputGroup>

        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  },
);

InputBase.displayName = 'InputBase';
