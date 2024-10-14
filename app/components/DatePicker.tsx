import React from "react";
import { DatePicker as AntdDatePicker } from "antd";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import dayjs from "dayjs";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

const DatePicker = <T extends FieldValues>({
  name,
  control,
  label,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <AntdDatePicker
          placeholder={label ? label : name}
          value={value ? dayjs(value) : null}
          onChange={(date, dateString) => {
            if (date) {
              const myDate = date.toISOString();
              onChange(myDate);
            } else {
              onChange("");
            }
          }}
        />
      )}
    />
  );
};

export default DatePicker;
