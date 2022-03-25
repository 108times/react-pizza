import React from "react";
import classNames from "classnames";
import { withSingleRipple } from "./ripple/withSingleRipple";
import { withMultipleRipple } from "./ripple/withMultipleRipple";

const Button = React.forwardRef((props, ref) => {
  const { text, className, outline, children } = props;
  return (
    <button
      ref={ref}
      className={classNames("button", className, {
        "button--outline": outline,
      })}
    >
      <span className="ripple-wrapper-text">{text}</span>
      {children}
    </button>
  );
});

export default withMultipleRipple(Button, {
  // onRippleAppend: (ref) =>
  //   setTimeout(() => {
  //     ref.current.classList.add("ripple-outline");
  //     setTimeout(() => ref.current.classList.remove("ripple-outline"), 100);
  //   }, 150),
  styles: {
    // background: 'rgba()'
  },
  theme: "dark",
  duration: 400,
});
