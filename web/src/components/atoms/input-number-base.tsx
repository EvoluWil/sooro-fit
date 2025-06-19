'use client';

import { Field, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { NumberFormatBaseProps, NumericFormat } from 'react-number-format';
import { InputBase } from './input-base';

export type NumberInputBaseProps = {
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
} & NumberFormatBaseProps;

export const InputNumberBase = forwardRef<
  HTMLInputElement,
  NumberInputBaseProps
>(
  (
    { label, error, placeholder, disabled, value, onChange, name, ...rest },
    ref,
  ) => {
    return (
      <Field.Root invalid={!!error} required={!!label}>
        {label && <Field.Label color="gray.500">{label}</Field.Label>}
        <NumericFormat
          getInputRef={ref}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onValueChange={(values) => {
            // Only call onChange if value actually changed
            if (values.value !== value) {
              onChange?.(values.value);
            }
          }}
          {...rest}
          customInput={InputBase}
        />
        {error && (
          <Field.ErrorText>
            <Text color="red.500">{error}</Text>
          </Field.ErrorText>
        )}
      </Field.Root>
    );
  },
);

InputNumberBase.displayName = 'InputNumberBase';
