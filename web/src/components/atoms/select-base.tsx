'use client';

import { Field, NativeSelect } from '@chakra-ui/react';
import { forwardRef } from 'react';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectBaseProps = {
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  options: SelectOption[];
};

export const SelectBase = forwardRef<HTMLSelectElement, SelectBaseProps>(
  (
    {
      label,
      error,
      placeholder,
      disabled,
      value,
      onChange,
      name,
      options = [],
    },
    ref,
  ) => {
    return (
      <Field.Root invalid={!!error} required={!!label}>
        {label && <Field.Label color="gray.500">{label}</Field.Label>}

        <NativeSelect.Root disabled={disabled}>
          <NativeSelect.Field
            colorPalette="brand"
            px={2}
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            color={value ? 'black' : 'gray.500 !important'}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>

        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  },
);

SelectBase.displayName = 'SelectBase';
