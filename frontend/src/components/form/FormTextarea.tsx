import React, { ChangeEvent } from "react";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export function FormTextarea({
  id,
  name,
  label,
  value,
  placeholder,
  rows = 3,
  onChange,
}: FormTextareaProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label fw-600">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className="form-control form-control-lg"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e0dbd4",
          borderRadius: "0.75rem",
        }}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
}
