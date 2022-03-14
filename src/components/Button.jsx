import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ text, className, outline, children }) => {
  return (
    <button
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {text}
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
export default Button;
