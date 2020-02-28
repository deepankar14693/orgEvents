import React from 'react'
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

//onChangeRaw below is for avoiding user to input any arbitrary text inside date picker component

const DateInput = ({ input: { value, onChange, onBlur }, width, type, placeholder, meta: { touched, error }, ...rest }) => {
  return (
    <Form.Field error={touched && !!error}>
      <DatePicker
        {...rest}
        placeholderText={placeholder}
        selected={
          value ?
            Object.prototype.toString.call(value) !== '[object Date]'
              ? value.toDate() : value
            : null}
        onChange={onChange}
        onBlur={(e, val) => onBlur(val)}
        onChangeRaw={(e) => e.preventDefault()} />
      {touched && error && <Label basic color='red'>{error}</Label>}
    </Form.Field>
  )
}

export default DateInput;
