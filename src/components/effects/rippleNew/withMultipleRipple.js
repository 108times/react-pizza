import React from 'react';

const DURATION = 500;

export function withMultipleRipple(ComponentWithRef, theme) {
  return function (props) {
    const rippleWrapper = React.useRef(null);
    const rippleContainer = React.useRef(null);
    // const [transitionDuration, setTransitionDuration] = React.useState(0);
    const checkEvent = (e) => e.path.includes(rippleWrapper.current);

    React.useEffect(() => {
      rippleWrapper.current.style.position = 'relative';
      rippleWrapper.current.style.overflow = 'hidden';

      window.addEventListener('mousedown', (e) => checkEvent(e) && appendRipple(e));
    }, []);

    window.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });

    const appendRipple = (e) => {
      if (rippleWrapper.current.blocking) return;

      return new Promise((resolve) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-element';
        rippleContainer.current.append(ripple);

        window.addEventListener('mouseup', function upHandler(e) {
          checkEvent(e) && removeRipple(ripple);
          window.removeEventListener('mouseup', upHandler);
        });
        window.addEventListener('mouseout', function leaveHandler(e) {
          checkEvent(e) && removeRipple(ripple);
          window.removeEventListener('mouseup', leaveHandler);
        });
        rippleWrapper.current.blocking = true;
        setTimeout(() => (rippleWrapper.current.blocking = false), 50);
        resolve(ripple);
      }).then((ripple) => {
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const { x: elemX, y: elemY } = rippleContainer.current.getBoundingClientRect();
        const styleLeft = cursorX - elemX + 'px';
        const styleTop = cursorY - elemY + 'px';
        const styleSize =
          Math.max(rippleWrapper.current.offsetWidth, rippleWrapper.current.offsetHeight) * 2 +
          'px';
        console.log(styleSize);
        const styleTransitionDur = getComputedStyle(rippleContainer.current).transitionDuration;
        console.dir(styleTransitionDur);
        ripple.style.setProperty('left', styleLeft);
        ripple.style.setProperty('top', styleTop);
        ripple.style.setProperty('--w', styleSize);
        ripple.style.setProperty('--h', styleSize);
        ripple.classList.add('ripple');
      });
    };

    const removeRipple = (ripple) => {
      setTimeout(() => {
        ripple.classList.add('fade');
        setTimeout(() => {
          ripple.remove();
        }, DURATION);
      }, DURATION);
    };

    return (
      <ComponentWithRef {...props} ref={rippleWrapper}>
        {props.children}
        <span className="ripple-container" ref={rippleContainer}></span>
      </ComponentWithRef>
    );
  };
}
