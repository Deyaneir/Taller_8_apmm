import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}

export const Button = ({ children, onClick, isLoading }: Props) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    style={{
      background: "#1B3A6B",
      color: "#fff",
      padding: "10px 14px",
      borderRadius: 8,
      border: "none",
      cursor: isLoading ? "wait" : "pointer",
    }}
  >
    {isLoading ? "Cargando..." : children}
  </button>
);

export default Button;
