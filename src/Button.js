import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const {
      backgroundColor,
      onClick,
      label,
      height = '1rem',
      width = '1rem',
    } = this.props;

    return (
      <button className="Button" style={{ backgroundColor: backgroundColor, height: height, width: width }} onClick={ onClick }>
      {label}
      </button>
    );
  }
}

export default Button;
