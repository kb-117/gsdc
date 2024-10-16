import { Select } from "antd";
import { Controller, FieldValues, Path, Control } from "react-hook-form";
import { useEffect } from "react";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: string; // Accept default value for gender
  setValue: (name: Path<T>, value: string) => void;
}

const GenderSelect = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  setValue,
}: Props<T>) => {
  // Dynamically set the gender value when defaultValue is available
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
        <Select {...field} placeholder="⚥ Gender">
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      )}
    />
  );
};

export default GenderSelect;
