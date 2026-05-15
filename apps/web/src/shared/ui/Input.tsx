import React from "react";

interface Props {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

export const Input = ({ label, value, onChange, placeholder, type = "text" }: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label ? <label style={{ fontSize: 14, color: "#334155" }}>{label}</label> : null}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid #CBD5E1" }}
      />
    </div>
  );
};

export default Input;
