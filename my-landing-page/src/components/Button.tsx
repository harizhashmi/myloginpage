import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "danger";
};

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700",
  secondary: "bg-slate-700 hover:bg-slate-600",
  danger: "bg-red-600 hover:bg-red-700",
};

function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={`px-5 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...rest}
    />
  );
}

export default Button;
