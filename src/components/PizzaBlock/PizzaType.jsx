import React from "react";
import classNames from "classnames";
import { withMultipleRipple } from "../UI/ripple/withMultipleRipple";

const PizzaType = React.forwardRef(
  ({ onClick, active, disabled, children, text }, ref) => {
    return (
      <li
        ref={ref}
        onClick={(e) => {
          ref.current.classList.add("ripple-outline");
          setTimeout(() => ref.current.classList.remove("ripple-outline"), 100);
          onClick(e);
        }}
        className={classNames({
          active: active,
          disabled: disabled,
        })}
      >
        <span className="text">{text}</span>
        {children}
      </li>
    );
  }
);

export default withMultipleRipple(PizzaType, {
  styles: {
    background: "#fff",
    // boxShadow: "0 0 0px 2px rgba(0,0,0,1)",
  },
  duration: 400,
});
