import React, { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  name,
  disabled = false,
  value,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
