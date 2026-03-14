import React, { ChangeEvent } from "react";
import { formInputStyle } from "../../styles/formStyles";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  value: string;
  placeholder?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  required?: boolean;
}

export function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label fw-600">
        {label} {required && "*"}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="form-control form-control-lg"
        style={formInputStyle}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
