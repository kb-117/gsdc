import React, { useEffect } from "react";
import { DatePicker as AntdDatePicker } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import dayjs from "dayjs";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  defaultValue?: string; // Accept default value for date
  setValue: (name: Path<T>, value: any) => void;
}

const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
  defaultValue, // Add defaultValue prop
  setValue,
}: Props<T>) => {
  // Dynamically set the date value when defaultValue is available
  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <AntdDatePicker
          placeholder={label ? label : name}
          value={value ? dayjs(value) : null} // Convert value to dayjs
          onChange={(date, dateString) => {
            if (date) {
              const myDate = date.toISOString(); // Convert to ISO string
              onChange(myDate);
            } else {
              onChange(""); // Handle null date
            }
          }}
        />
      )}
    />
  );
};

export default DatePicker;
