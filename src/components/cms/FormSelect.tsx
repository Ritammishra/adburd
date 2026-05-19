import React from "react";
import clsx from "clsx";

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  options: { label: string; value: string | number }[];
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-dark mb-1.5">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        <select
          ref={ref}
          className={clsx(
            "w-full bg-white border rounded-xl px-4 py-2.5 text-sm transition-all outline-none appearance-none",
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20",
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500 mt-1.5">{error}</p>}
        {helperText && !error && <p className="text-sm text-muted mt-1.5">{helperText}</p>}
      </div>
    );
  }
);
FormSelect.displayName = "FormSelect";
