/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactSelect, { Props, Theme } from "react-select";

const Select: React.FC<Props> = ({
  name,
  placeholder,
  isMultiple,
  value,
  options,
  onChange,
  isDisabled,
}) => {
  function customTheme(theme: Theme): Theme {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "#3CDC8C",
      },
      borderRadius: 5,
    };
  }

  return (
    <ReactSelect
      id={name}
      name={name}
      placeholder={placeholder}
      isMulti={isMultiple}
      value={value}
      options={options}
      onChange={onChange}
      theme={customTheme}
      className="basic-multi-select"
      classNamePrefix="select"
      isDisabled={isDisabled}
    />
  );
};

export { Select };
