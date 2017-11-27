import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    const {
      backgroundColor,
      onClick,
      label
    } = this.props;

    return (
      <button className="Button" style={{backgroundColor: backgroundColor}} onClick={onClick}>
      {label}
      </button>
    );
  }
}

export default Button;
