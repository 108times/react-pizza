import React from 'react';
import classNames from 'classnames';

const Button = ({text,className,outline, children}) => {
  return <button
      className={classNames(
          'button',
          className,
          {
            'button--outline': outline,
          },
      )}
  >
    {text}
    {children}
  </button>;
};

export default Button;