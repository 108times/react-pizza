import React from "react";
import applyStyles from "./utils/applyStyles";
import PropTypes from "prop-types";
const DURATION = 500;
const themes = {
  dark: "rgba(0,0,0,0.2)",
};

/***
 *
 * @param ComponentWithRef
 * @param settings
 * @returns {function(*): *}
 */
export function withMultipleRipple(ComponentWithRef, settings = {}) {
  const {
    styles,
    duration = 500,
    theme,
    onRippleAppend,
    onRippleAnimationHalf,
  } = settings;
  return function (props) {
    const rippleWrapper = React.useRef(null);
    const rippleContainer = React.useRef(null);

    const checkEvent = (e) => e.path.includes(rippleWrapper.current);
    const setTheme = (theme, ripple) => {
      ripple.style.setProperty("background", themes[theme]);
    };
    const getValueFromPercent = (initialValue, percent) => {
      return (initialValue / 100) * percent;
    };

    React.useEffect(() => {
      if (getComputedStyle(rippleWrapper.current).position === "static") {
        rippleWrapper.current.style.setProperty("position", "relative");
      }

      window.addEventListener(
        "mousedown",
        (e) => checkEvent(e) && appendRipple(e)
      );
      // rippleContainer.current.coords = () => rippleContainer.current.getBoundingClientRect();
    }, []);

    window.addEventListener("dragstart", (e) => {
      checkEvent(e) && e.preventDefault();
    });

    const appendRipple = async (e) => {
      if (rippleWrapper.current.blocking) return;
      return new Promise((resolve) => {
        const ripple = document.createElement("span");
        ripple.className = "ripple-element";
        rippleContainer.current.append(ripple);

        window.addEventListener("mouseup", function upHandler(e) {
          checkEvent(e) && removeRipple(ripple);
          window.removeEventListener("mouseup", upHandler);
        });

        window.addEventListener("mouseout", function leaveHandler(e) {
          checkEvent(e) && removeRipple(ripple);
          window.removeEventListener("mouseup", leaveHandler);
        });

        rippleWrapper.current.blocking = true;
        setTimeout(() => (rippleWrapper.current.blocking = false), 50);

        if (theme) {
          setTheme(theme, ripple);
        }
        if (styles) {
          applyStyles(styles, ripple);
        }

        if (onRippleAnimationHalf) {
          const { percent = 50, styles = {} } = onRippleAnimationHalf;
          setTimeout(() => {
            applyStyles(styles, ripple);
          }, getValueFromPercent(duration, percent));
        }

        ripple.style.setProperty("transition-duration", duration + "ms");

        resolve(ripple);
      }).then((ripple) => {
        // center ripple within rippleContainer, set its width and
        // start the animation
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const { x: elemX, y: elemY } =
          rippleContainer.current.getBoundingClientRect();
        const styleLeft = cursorX - elemX + "px";
        const styleTop = cursorY - elemY + "px";
        const styleSize =
          Math.max(
            rippleWrapper.current.offsetWidth,
            rippleWrapper.current.offsetHeight
          ) *
            2 +
          "px";
        ripple.style.setProperty("left", styleLeft);
        ripple.style.setProperty("top", styleTop);
        ripple.style.setProperty("--w", styleSize);
        ripple.style.setProperty("--h", styleSize);

        ripple.classList.add("ripple");
        onRippleAppend && onRippleAppend(rippleWrapper);
      });
    };

    const removeRipple = (ripple) => {
      setTimeout(() => {
        ripple.classList.add("fade");

        setTimeout(() => {
          ripple.remove();
        }, duration);
      }, duration);
    };

    return (
      <ComponentWithRef {...props} ref={rippleWrapper}>
        {props.children}
        <span className="ripple-container" ref={rippleContainer}></span>
      </ComponentWithRef>
    );
  };
}

withMultipleRipple.propTypes = {
  ComponentWithRef: PropTypes.object.isRequired,
  options: PropTypes.object,
};
