import { Input as AntdInput } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  prefix?: React.ReactNode;
}

const Input = <T extends FieldValues>({
  name,
  control,
  label,
  prefix,
}: Props<T>) => {
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
