import React from "react";
import clsx from "clsx";

export interface FormSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const FormSwitch = React.forwardRef<HTMLInputElement, FormSwitchProps>(
  ({ label, description, className, ...props }, ref) => {
    return (
      <label className="flex items-start cursor-pointer group">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            className="sr-only peer"
            ref={ref}
            {...props}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </div>
        <div className="ml-3">
          <span className="block text-sm font-medium text-dark">{label}</span>
          {description && <span className="block text-sm text-muted mt-0.5">{description}</span>}
        </div>
      </label>
    );
  }
);
FormSwitch.displayName = "FormSwitch";
