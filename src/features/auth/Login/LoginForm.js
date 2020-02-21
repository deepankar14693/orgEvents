import React from 'react'
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login } from '../authActions';
import { connect } from 'react-redux';

const mapDispatchToProps = {
  login
}

const LoginForm = ({ login, handleSubmit, error }) => {
  return (
    //handle submit is prop received from redux-forms, handleSubmit passes all credentials to login action
    <Form error size='large' onSubmit={handleSubmit(login)}>
      <Segment>
        <Field
          name='email'
          component={TextInput}
          type='text'
          placeholder='Email Address'
        />
        <Field
          name='password'
          component={TextInput}
          type='password'
          placeholder='password'
        />
        {error && <Label basic color='red'>{error}</Label>}
        <Button fluid size='large' color='teal'>
          Login
        </Button>
      </Segment>
    </Form>
  )
}

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'loginForm' })(LoginForm));
