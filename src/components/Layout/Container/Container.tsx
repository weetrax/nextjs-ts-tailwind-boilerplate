import PropTypes from "prop-types";
import React from "react";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">{children}</div>
  );
};

Container.propTypes = {
  //
};

export default Container;
