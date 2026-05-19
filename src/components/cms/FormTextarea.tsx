import React from "react";
import clsx from "clsx";

export interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-dark mb-1.5">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          ref={ref}
          rows={rows}
          className={clsx(
            "w-full bg-white border rounded-xl px-4 py-2.5 text-sm transition-all outline-none resize-y",
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-200"
              : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-500 mt-1.5">{error}</p>}
        {helperText && !error && <p className="text-sm text-muted mt-1.5">{helperText}</p>}
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";
