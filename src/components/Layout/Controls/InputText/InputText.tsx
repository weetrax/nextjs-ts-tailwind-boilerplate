import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { ControlVariant } from "@/types";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: ControlVariant;
  label?: string;
  additionnalClassname?: string;
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  ({ variant, label, additionnalClassname, ...props }, ref) => {
    const v =
      variant === "primary"
        ? "dark:focus:border-primary-500 focus:border-primary-500"
        : variant === "success"
        ? "dark:focus:border-green-500 focus:border-green-500"
        : variant === "error" &&
          "dark:focus:border-red-500 focus:border-red-500";

    let classname = clsx(
      "border border-gray-300 hover:border-primary-500 dark:hover:border-primary-500 dark:border-dark-700 px-3 py-2 rounded-xl text-black dark:text-white bg-white dark:bg-dark-450 focus:outline-none dark:focus:border-primary-500 focus:border-primary-500 duration-200 transition-colors ease-in-out",
      v,
      additionnalClassname
    );

    if (props.className) classname = props.className;

    return label ? (
      <div className="space-y-1">
        <label className="block text-sm font-medium" htmlFor={props.id}>
          {label}
        </label>
        <input ref={ref} className={classname} {...props}></input>
      </div>
    ) : (
      <input ref={ref} className={classname} {...props}></input>
    );
  }
);

InputText.propTypes = {
  //
};

InputText.displayName = "InputText";

export default InputText;
