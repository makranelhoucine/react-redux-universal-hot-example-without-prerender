import React, { Component, PropTypes } from 'react';
import { Form } from 'elements';

export default class Checkbox extends Component {
  static propTypes = {
    className: PropTypes.string,
    classNameInput: PropTypes.string,
    field: PropTypes.object.isRequired,
    label: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { className, classNameInput, field, label } = this.props;
    return (
      <Form.Group>
        <div className={`checkbox ${className}` + (field.error && field.touched ? 'has-error ' : '')}>
          <label>
            <input
              className={'form-checkbox ' + (classNameInput ? `${classNameInput} ` : '') + (field.error && field.touched ? 'is-error ' : '')}
              type="checkbox"
              disabled={field.input.disabled}
              id={'form-checkbox-' + field.input.name}
              {...field.input}
            />
            {label}
          </label>
          <Form.Error message={field.error && field.touched ? field.error : ''} />
        </div>
      </Form.Group>
    );
  }
}

