import React, { useEffect } from 'react';
import './style.css';
const RippleElement = ({ ref, parentWidth = 400, parentHeight = 400 }) => {
  React.useEffect(() => {
    ref.current.style.setProperty('--w', parentWidth + 'px');
    ref.current.style.setProperty('--h', parentHeight + 'px');
    ref.current.classList.add('ripple');
  }, []);

  return <div className="ripple-element" ref={ref}></div>;
};

const withRipple = (Component) => {
  return function (props) {
    const rippleRef = React.useRef(null);
    const rippleContainerRef = React.useRef(null);
    const rippleWrapperRef = React.useRef(null);
    const transitionDurationRef = React.useRef(300);
    const containerSize = React.useRef({});
    const [showRipple, setShowRipple] = React.useState(false);

    const rippleStart = (event) => {
      console.log(showRipple);
      if (showRipple) return;
      setShowRipple(true);
      const cursorX = event.clientX;
      const cursorY = event.clientY;
      const styleLeft = cursorY - rippleRef.current.offsetLeft;
      const styleTop = cursorX - rippleRef.current.offsetTop;
      rippleRef.current.classList.add('appear');
      rippleRef.current.style.setProperty('left', styleLeft + 'px');
      rippleRef.current.style.setProperty('top', styleTop + 'px');
      rippleWrapperRef.addEventListener('onmouseout', rippleEnd);
      rippleWrapperRef.addEventListener('onmouseup', rippleEnd);
    };

    const getTransitionDuration = (domElem) => {
      // const rawDuration = getComputedStyle(domElem).transitionDuration;
      // return rawDuration.includes('s')
      return 300;
    };

    const rippleEnd = () => {
      rippleRef.current.remove.add('ripple');
      rippleWrapperRef.removeEventListener('onmouseout', rippleEnd);
      rippleWrapperRef.removeEventListener('onmouseup', rippleEnd);
      setTimeout(() => {
        setShowRipple(false);
      }, transitionDurationRef.current);
    };

    useEffect(() => {
      transitionDurationRef.current = getTransitionDuration(rippleRef.current);
      containerSize.current = {
        width: rippleContainerRef.current.offsetWidth,
        height: rippleContainerRef.current.offsetHeight,
      };
    }, []);
    return (
      <div ref={rippleWrapperRef} className="ripple-wrapper" onMouseDown={rippleStart}>
        <Component {...props}>
          <div className="ripple-container" ref={rippleContainerRef}>
            {showRipple && (
              <RippleElement
                ref={rippleRef}
                parentWidth={containerSize.current.width}
                parentHeight={containerSize.current.height}
              />
            )}
          </div>
          {props.children}
        </Component>
      </div>
    );
  };
};

export default withRipple;
