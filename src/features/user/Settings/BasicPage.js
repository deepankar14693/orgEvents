import React, { Component } from 'react';
import { Segment, Form, Header, Divider, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from '../../../app/common/form/RadioInput';
import { addYears } from 'date-fns';
import { initialize } from 'redux-form';

class BasicPage extends Component {

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevProps.initialValues !== this.props.initialValues) {
  //     initialize('userProfile');
  //   }
  // }

  render() {
    const { pristine, submitting, handleSubmit, updateProfile } = this.props;
    return (
      <Segment>
        <Header dividing size='large' content='Basics' />
        <Form onSubmit={handleSubmit(updateProfile)} >
          <Field
            width={8}
            name='displayName'
            type='text'
            component={TextInput}
            placeholder='Known As'
          />
          <Form.Group inline>
            <label>Gender: </label>
            <Field name="gender" component={RadioInput} type="radio" value="male" label="Male" />
            <Field name="gender" component={RadioInput} type="radio" value="female" label="Female" />
            <Field name="gender" component={RadioInput} type="radio" value="other" label="Other" />
          </Form.Group>
          <Field
            width={8}
            name='dateOfBirth'
            component={DateInput}
            placeholder='Date of Birth'
            dateFormat='dd LLL yyyy'
            showYearDropdown={true}
            showMonthDropdown={true}
            dropdownMode='select'
            maxDate={addYears(new Date(), -18)}
          />
          <Field
            name='city'
            placeholder='Home Town'
            options={{ types: ['(cities)'] }}
            label='Female'
            component={PlaceInput}
            width={8}
          />
          <Divider />
          <Button disabled={pristine || submitting} size='large' positive content='Update Profile' />
        </Form>
      </Segment>
    );
  }
}

export default reduxForm({ form: 'userProfile', enableReinitialize: true, destroyOnUnmount: false })(BasicPage);
