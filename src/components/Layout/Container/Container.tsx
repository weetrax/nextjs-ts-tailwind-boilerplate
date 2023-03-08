import * as React from "react";
import PropTypes from "prop-types";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

Container.propTypes = {
  //
};

export default Container;
