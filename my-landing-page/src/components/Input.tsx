import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

function Input({ label, error, id, ...rest }: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-400 mb-2"
      >
        {label}
      </label>

      <input
        id={id}
        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
        {...rest}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default Input;
