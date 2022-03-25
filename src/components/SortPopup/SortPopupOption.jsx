import React from "react";
import { withRipple } from "../UI/ripple";

const SortPopupOption = React.forwardRef(
  ({ active, onClick, text, children }, ref) => {
    const hanldeClick = (e) => {
      setTimeout(() => {
        onClick(e);
      }, 200);
    };
    return (
      <li ref={ref} className={active ? "active" : ""} onClick={hanldeClick}>
        <span className="ripple-wrapper-text">{text}</span>
        {children}
      </li>
    );
  }
);

export default withRipple(SortPopupOption, {
  theme: "dark",
});
