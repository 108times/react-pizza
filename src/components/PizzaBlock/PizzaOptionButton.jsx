import React from 'react';
import classNames from 'classnames';
import { withMultipleRipple } from '../UI/ripple/withMultipleRipple';

const PizzaOptionButton = React.forwardRef(({ onClick, active, disabled, children, text }, ref) => {
  // React.useEffect(() => {
  //   if (active) {
  //     ref.current.classList.add('ripple-outline');
  //     setTimeout(() => ref.current.classList.remove('ripple-outline'), 100);
  //   }
  // }, [active]);

  // const onMouseDownHandler = () => {
  //   ref.current.classList.add('ripple-outline');
  //   setTimeout(() => ref.current.classList.remove('ripple-outline'), 100);
  // };
  return (
    <li
      ref={ref}
      onClick={onClick}
      // onMouseDown={onMouseDownHandler}
      // onClick={(e) => {
      //   ref.current.classList.add('ripple-outline');
      //   setTimeout(() => ref.current.classList.remove('ripple-outline'), 400);
      //   onClick(e);
      // }}
      // style={active ? { boxShadow: '0 0 0 4px #fe5f1e' } : {}}
      className={classNames({
        active: active,
        disabled: disabled,
      })}>
      <span className="text">{text}</span>
      {children}
    </li>
  );
});

export default withMultipleRipple(PizzaOptionButton, {
  onRippleAppend: (ref) =>
    setTimeout(() => {
      ref.current.classList.add('ripple-outline');
      setTimeout(() => ref.current.classList.remove('ripple-outline'), 100);
    }, 250),
  onFirstClick: {
    styles: {
      background: '#fff',
      boxShadow: ' 0 0 4px 12px #fe5f1e, inset 0 0 4px 12px #fe5f1e',
    },
  },
  styles: {
    background: '#fff',
    boxShadow: '0 0 18px 2px #fe5f1e, inset 0 0 18px 2px #fe5f1e',
  },
  duration: 500, // number | inherit
});
