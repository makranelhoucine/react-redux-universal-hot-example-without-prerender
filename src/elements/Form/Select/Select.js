import React, { Component, PropTypes } from 'react';
import { Form } from 'elements';

export default class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    classNameInput: PropTypes.string,
    defaultLabel: PropTypes.string,
    field: PropTypes.object.isRequired,
    help: PropTypes.string,
    label: PropTypes.string,
    multiple: PropTypes.bool
  }

  static defaultProps = {
    className: '',
    multiple: false
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { className, classNameInput, defaultLabel, field, help, label, multiple } = this.props;
    return (
      <Form.Group>
        <div className={`${className} ` + (field.error && field.touched ? 'has-error ' : '')}>
          <label htmlFor={'form-select-' + field.input.name}>{label}</label>
          {field.input.list.length > 0 &&
          <select
            className={'form-control ' + (classNameInput ? classNameInput : '') + (field.error && field.touched ? ' is-error ' : '')}
            disabled={field.input.disabled}
            id={'form-select-' + field.input.name}
            multiple={multiple}
            {...field.input}
          >
            {defaultLabel && !multiple &&
              <option value={''}>{defaultLabel}</option>
            }
            {field.input.list.map((item, i) => {
              if (item.active) {
                return (
                  <option key={i} value={item.value}>{item.label}</option>
                );
              }
              return (
                <option key={i} value={item.value} disabled>{item.label}</option>
              );
            })}
          </select>}
          {help && <p className="help-block">{help}</p>}
          <Form.Error message={field.error && field.touched ? field.error : ''} />
        </div>
      </Form.Group>
    );
  }
}
