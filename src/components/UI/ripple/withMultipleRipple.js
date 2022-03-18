import React from "react";

const DURATION = 500;
const themes = {
  dark: "dark",
};

/***
 *
 * @param ComponentWithRef
 * @param settings
 * @returns {function(*): *}
 */
export function withMultipleRipple(ComponentWithRef, settings = {}) {
  const { styles, duration = 500, theme } = settings;
  return function (props) {
    const rippleWrapper = React.useRef(null);
    const rippleContainer = React.useRef(null);

    const checkEvent = (e) => e.path.includes(rippleWrapper.current);

    React.useEffect(() => {
      rippleWrapper.current.style.setProperty("position", "relative");

      window.addEventListener(
        "mousedown",
        (e) => checkEvent(e) && appendRipple(e)
      );
    }, []);

    window.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });

    const appendRipple = (e) => {
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
        resolve(ripple);
      }).then((ripple) => {
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
        ripple.style.setProperty("transition-duration", duration + "ms");

        if (theme) {
          ripple.classList.add(themes[theme]);
        }
        if (styles) {
          function applyStyles(styles, elem) {
            const getUppercaseIndexes = (word) => {
              const result = [];
              for (let i = 0, y = 0, length = word.length; i < length; i++) {
                if (word[i] === word[i].toUpperCase()) {
                  result.push(i);
                }
              }
              return result.length ? result : null;
            };

            // transitionDuration -> transition-duration
            const toHyphenCase = (item) => {
              const uppercaseIndexes = getUppercaseIndexes(item);
              if (!uppercaseIndexes) return item;
              let pos = 0;
              let result = "";
              uppercaseIndexes.forEach((idx) => {
                result += item.slice(pos, idx) + `-${item[idx].toLowerCase()}`;
                pos = idx;
              });
              result += item.slice(pos + 1, item.length);
              return result;
            };

            for (let prop in styles) {
              if (styles.hasOwnProperty(prop)) {
                const name = toHyphenCase(prop);
                elem.style.setProperty(name, styles[prop]);
                console.log(name, styles[prop]);
              }
            }
          }

          applyStyles(styles, ripple);
        }

        ripple.classList.add("ripple");
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
