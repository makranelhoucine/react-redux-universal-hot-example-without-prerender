import React, { Component, PropTypes } from 'react';
import autosize from '../../../libs/autosize/autosize';
import ReactDOM from 'react-dom';
import { Form } from 'elements';
import {} from './TextareaAutosize.scss';

const UPDATE = 'autosize:update';
const DESTROY = 'autosize:destroy';

export default class TextareaAutosize extends Component {
  static propTypes = {
    autoComplete: PropTypes.string,
    className: PropTypes.string,
    field: PropTypes.object.isRequired,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    row: PropTypes.number,
    onKeyPress: React.PropTypes.func
  }

  static defaultProps = {
    className: ''
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      const area = ReactDOM.findDOMNode(this.refs.textarea);
      if (area) {
        autosize(area);
      }
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.getValue(nextProps) !== this.getValue(this.props)) {
      this.dispatchEvent(UPDATE, true);
    }
  }

  componentWillUnmount() {
    this.dispatchEvent(DESTROY);
  }

  getValue(props) {
    if (props) {
      return props.valueLink ? props.valueLink.value : props.value;
    }
  }

  dispatchEvent(EVENT_TYPE, defer) {
    const event = document.createEvent('Event');
    event.initEvent(EVENT_TYPE, true, false);
    const dispatch = () => ReactDOM.findDOMNode(this.refs.textarea).dispatchEvent(event);
    if (defer) {
      setTimeout(dispatch);
    } else {
      dispatch();
    }
  }

  render() {
    const { autoComplete, className, field, label, maxLength, onKeyPress, row } = this.props;
    return (
      <Form.Group>
        <div className="form-textarea-autosize">
          <div className={className + (field.error && field.touched ? 'has-error ' : '')}>
          <label htmlFor={'form-input-' + field.input.name}>{label}</label>
          <textarea
            className="form-control"
            autoComplete={autoComplete}
            disabled={field.input.disabled}
            onKeyPress={onKeyPress ? onKeyPress : ''}
            name={field.input.name}
            ref="textarea"
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

