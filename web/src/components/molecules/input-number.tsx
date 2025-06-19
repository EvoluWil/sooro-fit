import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import {
  InputNumberBase,
  NumberInputBaseProps,
} from '../atoms/input-number-base';

export type InputNumberProps<T extends FieldValues> = NumberInputBaseProps &
  UseControllerProps<T>;

export function InputNumber<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  disabled,
  ...inputBaseProps
}: InputNumberProps<T>) {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <InputNumberBase
      {...inputBaseProps}
      error={error?.message}
      value={field.value ?? ''}
      onChange={(value) => field.onChange(value ?? '')}
      disabled={isSubmitting || disabled}
    />
  );
}
