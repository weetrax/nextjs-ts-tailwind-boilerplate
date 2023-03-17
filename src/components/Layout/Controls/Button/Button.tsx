import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: "default" | "outline";
  loading?: boolean;
  additionnalClassname?: string;
}

const Button: React.FC<ButtonProps> = ({
  shape = "default",
  loading,
  children,
  additionnalClassname,
  ...props
}) => {
  let classname = clsx(
    "px-3 py-2 rounded-xl",
    shape === "default"
      ? "bg-primary-500 hover:bg-primary-400 text-white"
      : "border border-primary-500 hover:border-primary-400",
    "w-full transition-colors duration-200 ease-in-out",
    additionnalClassname
  );

  if (props.className) classname = props.className;

  return (
    <button disabled={loading} className={classname} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  //
};

export default Button;
