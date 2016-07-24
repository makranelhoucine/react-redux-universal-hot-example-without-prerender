import React, { Component, PropTypes } from 'react';
import { Form } from 'elements';
import {} from './Input.scss';
import Pikaday from 'pikaday';

export default class Input extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    autoComplete: PropTypes.bool,
    className: PropTypes.string,
    classNameInput: PropTypes.string,
    field: PropTypes.object.isRequired,
    help: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string.isRequired
  }

  static defaultProps = {
    autoFocus: false,
    autoComplete: false,
    className: '',
    type: 'text'
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { autoComplete, autoFocus, className, classNameInput, field, help, label, type } = this.props;
    return (
      <Form.Group>
        <div className={className + (field.error && field.touched ? 'has-error ' : '')}>
          <label htmlFor={'form-input-' + field.input.name}>{label}</label>
          <input
            autoFocus={autoFocus}
            autoComplete={autoComplete ? 'on' : 'off'}
            className={'form-control ' + (classNameInput ? `${classNameInput} ` : '') + (field.error && field.touched ? 'is-error ' : '')}
            type={type}
            disabled={field.input.disabled}
            placeholder={label}
            id={'form-input-' + field.input.name}
            {...field.input}
          />
          <Form.Error message={field.error && field.touched ? field.error : ''} />
          {help && <p className="help-block">{help}</p>}
        </div>
      </Form.Group>
    );
  }
}

