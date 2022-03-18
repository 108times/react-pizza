import React from 'react';
import classNames from 'classnames';
import { withSingleRipple } from './ripple/withSingleRipple';
import { withMultipleRipple } from './ripple/withMultipleRipple';

const Button = React.forwardRef((props, ref) => {
  const { text, className, outline, children } = props;
  return (
    <button
      ref={ref}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {text}
      {children}
    </button>
  );
});

export default withMultipleRipple(Button);
