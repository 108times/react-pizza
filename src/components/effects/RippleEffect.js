import React, {useEffect} from 'react';

export default function RippleEffect({Component}) {

  const rippleRef = React.useRef();
  const transitionDurationRef = React.useRef()
  const [isClicked, setIsClicked] = React.useState(false);

  useEffect(() => {
    transitionDurationRef.current = getTransitionDuration(rippleRef.current)
  }, [])

  const rippleStart = event => {
    if (!isClicked) return;
    setIsClicked(true);

    rippleRef.current.classList.add('appear')
  };

  const getTransitionDuration = domElem => {
    const rawDuration = getComputedStyle(domElem).transitionDuration
    // return rawDuration.includes('s')
    console.log(rawDuration)
    return rawDuration
  }

  const rippleEnd = event => {

  };

  return (
      <Component
          onMouseDown={rippleStart}
          onMouseOut={rippleEnd}
      >
        <div className="rippleContainer">
          {
            isClicked ? <div
                ref={rippleRef}
                className={'ripple'}
            ></div> : ''
          }
        </div>
      </Component>
  );
}