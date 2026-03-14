import React, { ChangeEvent } from "react";
import { formInputStyle } from "../../styles/formStyles";

interface FileUploadFieldProps {
  id: string;
  name: string;
  label: string;
  accept: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploadField({
  id,
  name,
  label,
  accept,
  onChange,
}: FileUploadFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="form-label fw-600">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        className="form-control form-control-lg"
        style={formInputStyle}
        accept={accept}
        onChange={onChange}
      />
    </div>
  );
}
