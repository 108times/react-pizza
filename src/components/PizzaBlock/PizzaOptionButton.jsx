import React from "react";
import classNames from "classnames";
import { withRipple } from "../UI/ripple";

const PizzaOptionButton = React.forwardRef(
  ({ onClick, active, disabled, children, text }, ref) => {
    return (
      <li
        ref={ref}
        onClick={onClick}
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

export default withRipple(PizzaOptionButton, {
  onRippleAppend: (ref) =>
    setTimeout(() => {
      ref.current.classList.add("ripple-outline");
      setTimeout(() => ref.current.classList.remove("ripple-outline"), 100);
    }, 200),
  onFirstClick: {
    styles: {
      background: "#fff",
      boxShadow: " 0 0 4px 12px #fe5f1e, inset 0 0 4px 12px #fe5f1e",
    },
  },
  onRippleAnimationHalf: {
    percent: 10,
    styles: {
      boxShadow: "0 0 28px 2px #fe5f1e, inset 0 0 28px 2px #fe5f1e",
    },
  },
  styles: {
    background: "#fff",
    boxShadow: "0 0 2px 1px #fe5f1e",
  },
  duration: 500, // number | inherit
});
