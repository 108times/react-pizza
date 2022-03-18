import React from 'react';

const DURATION = 500;

export function withSingleRipple(ComponentWithRef, theme) {
  return function (props) {
    const rippleWrapper = React.useRef(null);
    const rippleRef = React.useRef(null);
    const rippleContainer = React.useRef(null);
    const [showRipple, setShowRipple] = React.useState(false);
    // const [transitionDuration, setTransitionDuration] = React.useState(0);

    React.useEffect(() => {
      rippleWrapper.current.style.position = 'relative';
      rippleWrapper.current.style.overflow = 'hidden';

      const check = (e) => e.path.includes(rippleWrapper.current);
      window.addEventListener('mousedown', (e) => check(e) && appendRipple(e));

      window.addEventListener('mouseup', (e) => check(e) && removeRipple(e));
    }, []);

    const Ripple = (props) => {
      return <div className="ripple-element" ref={rippleRef}></div>;
    };

    const appendRipple = (e) => {
      console.log(rippleRef.current);
      if (rippleRef.current || rippleRef.current?.isAnimating) return;

      setShowRipple(true);

      new Promise((resolve) => {
        const cursorX = e.clientX;
        const cursorY = e.clientY;
        const { x: elemX, y: elemY } = rippleContainer.current.getBoundingClientRect();
        const styleLeft = cursorX - elemX + 'px';
        const styleTop = cursorY - elemY + 'px';
        rippleRef.current.style.setProperty('left', styleLeft);
        rippleRef.current.style.setProperty('top', styleTop);
        resolve();
      })
        .then(() => {
          rippleRef.current.classList.add('ripple');
          rippleRef.current.isAnimating = true;
        })
        .then(() => {
          setTimeout(() => {
            if (rippleRef.current) rippleRef.current.isAnimating = false;
          }, DURATION);
        });
    };

    const removeRipple = (e) => {
      function remove() {
        // console.log(rippleRef.current?.isAnimating);
        if (rippleRef.current?.isAnimating) {
          setTimeout(() => {
            remove();
          }, 50);
        } else {
          rippleRef.current?.classList.add('fade');
          setTimeout(() => {
            setShowRipple(false);
          }, DURATION);
        }
      }

      remove();

      // if (rippleRef.current && rippleRef.current.isAnimating) {
      //   const tracker = setInterval(() => {
      //     if (rippleRef.current && rippleRef.current.isAnimating) return false;
      //     console.log(rippleRef.current.isAnimating);

      //     clearInterval(tracker);
      //   }, 50);
      // }
    };

    return (
      <ComponentWithRef {...props} ref={rippleWrapper}>
        {props.children}
        <div className="ripple-container" ref={rippleContainer}>
          {showRipple && <Ripple />}
        </div>
      </ComponentWithRef>
    );
  };
}
