import React, { Component, PropTypes } from 'react';

export default class Error extends Component {
  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { className, message } = this.props;
    return (
      <div>
        {message !== '' &&
        <div className={'form-error help-block' + (className ? className : '')}>
          {message}
        </div>}
      </div>
    );
  }
}

