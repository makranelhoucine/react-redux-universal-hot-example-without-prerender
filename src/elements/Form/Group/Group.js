import React, { Component, PropTypes } from 'react';

export default class Group extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    className: ''
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { className, children } = this.props;
    return (
      <div className={'form-group ' + className}>
        {children}
      </div>
    );
  }
}

