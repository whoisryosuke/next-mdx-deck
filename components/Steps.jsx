import React from "react";

export const Steps = ({ children }) => {
  const renderChildren = () => {
    return React.Children.map(children, (element, index) => {
      return (
        <element.type order={index} {...element.props}>
          {element.props.children}
        </element.type>
      );
    });
  };
  return <div>{renderChildren()}</div>;
};

export default Steps;
