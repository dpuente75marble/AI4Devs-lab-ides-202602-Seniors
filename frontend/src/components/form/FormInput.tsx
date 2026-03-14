import React, { ChangeEvent } from "react";

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
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e0dbd4",
          borderRadius: "0.75rem",
        }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
