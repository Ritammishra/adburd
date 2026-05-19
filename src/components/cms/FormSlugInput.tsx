import React from "react";
import clsx from "clsx";
import { Link2 } from "lucide-react";
import { generateSlug } from "@/utils/slug";

export interface FormSlugInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  sourceValue?: string; // e.g. the title to generate from
  onGenerate?: (slug: string) => void;
}

export const FormSlugInput = React.forwardRef<HTMLInputElement, FormSlugInputProps>(
  ({ label, error, helperText, sourceValue, onGenerate, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-dark">
            {label} {props.required && <span className="text-red-500">*</span>}
          </label>
          {sourceValue && onGenerate && (
            <button
              type="button"
              onClick={() => onGenerate(generateSlug(sourceValue))}
              className="text-xs text-primary hover:text-primary-hover font-medium flex items-center gap-1"
            >
              <Link2 className="w-3 h-3" /> Generate from title
            </button>
          )}
        </div>
        <input
          ref={ref}
          className={clsx(
            "w-full bg-light border rounded-xl px-4 py-2.5 text-sm transition-all outline-none font-mono text-muted",
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
FormSlugInput.displayName = "FormSlugInput";
