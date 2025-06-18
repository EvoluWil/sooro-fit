import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { SelectBase, SelectBaseProps } from '../atoms/select-base';

export type SelectProps<T extends FieldValues> = SelectBaseProps &
  UseControllerProps<T>;

export function Select<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  disabled,
  ...inputBaseProps
}: SelectProps<T>) {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control, defaultValue, rules, shouldUnregister });

  return (
    <SelectBase
      {...inputBaseProps}
      error={error?.message}
      value={field.value}
      onChange={field.onChange}
      disabled={isSubmitting || disabled}
    />
  );
}
