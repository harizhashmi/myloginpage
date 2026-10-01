import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "danger";
};

const variants = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-white hover:bg-slate-100 text-slate-900",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  return (
    <button
      className={` px-5 py-3 rounded-xl font-semibold transition-colors ${variants[variant]} ${className}`}
      {...rest}
    />
  );
}

export default Button;
