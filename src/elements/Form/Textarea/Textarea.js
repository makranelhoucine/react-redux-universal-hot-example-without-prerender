import React, { Component, PropTypes } from 'react';
import { Form } from 'elements';
import {} from './Textarea.scss';

export default class Textarea extends Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    className: PropTypes.string,
    classNameTextarea: PropTypes.string,
    field: PropTypes.object.isRequired,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    row: PropTypes.number
  }

  static defaultProps = {
    className: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { autoComplete, className, field, label, maxLength, row } = this.props;
    return (
      <Form.Group>
        <div className="form-textarea-autosize">
          <div className={className + (field.error && field.touched ? 'has-error ' : '')}>
            <label htmlFor={'form-input-' + field.input.name}>{label}</label>
            <textarea
              className="form-control"
              autoComplete={autoComplete}
              disabled={field.input.disabled}
              name={field.input.name}
              rows={row || 1}
              maxLength={maxLength}
              placeholder={label}
              {...field.input}
            />
            <Form.Error message={field.error && field.touched ? field.error : ''} />
          </div>
        </div>
      </Form.Group>
    );
  }
}

