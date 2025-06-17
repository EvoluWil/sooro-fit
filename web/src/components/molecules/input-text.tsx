import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { InputBase, InputBaseProps } from '../atoms/input-base';

export type InputTextProps<T extends FieldValues> = InputBaseProps &
  UseControllerProps<T>;

export function InputText<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  disabled,
  ...inputBaseProps
}: InputTextProps<T>) {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <InputBase
      {...inputBaseProps}
      error={error?.message}
      value={field.value}
      onChange={field.onChange}
      disabled={isSubmitting || disabled}
    />
  );
}
