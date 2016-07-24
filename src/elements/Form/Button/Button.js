import React, { Component, PropTypes } from 'react';
import {} from './Button.scss';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { className, children, disabled, onClick, type } = this.props;
    return (
      <button type={type} disabled={disabled} className={'form-button ' + className} onClick={onClick}>{children}</button>
    );
  }
}

