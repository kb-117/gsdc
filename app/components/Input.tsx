import { Input as AntdInput } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useEffect } from "react";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  prefix?: React.ReactNode;
  defaultValue?: string | null;
  setValue: (name: Path<T>, value: string) => void; // Add setValue for dynamic updates
}

const Input = <T extends FieldValues>({
  name,
  control,
  label,
  prefix,
  defaultValue,
  setValue,
}: Props<T>) => {
  // Use useEffect to set the value when defaultValue changes
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <AntdInput
          {...field}
          placeholder={label ? label : name}
          prefix={prefix}
        />
      )}
    />
  );
};

export default Input;
