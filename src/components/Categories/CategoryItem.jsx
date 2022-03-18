import { withMultipleRipple } from "../UI/ripple/withMultipleRipple";
import React from "react";
const CategoryItem = React.forwardRef((props, ref) => {
  const { text, children, onClick, isActive } = props;
  return (
    <li className={isActive ? "active" : ""} onClick={onClick} ref={ref}>
      <span className="text">{text}</span>
      {children}
    </li>
  );
});

export default withMultipleRipple(CategoryItem, {
  styles: { background: "#000" },
});
