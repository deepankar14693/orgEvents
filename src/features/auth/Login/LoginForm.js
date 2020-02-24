import React from 'react'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login, socialLogin } from '../authActions';
import { connect } from 'react-redux';
import SocialLogin from '../SocialLogin/SocialLogin';

const mapDispatchToProps = {
  login,
  socialLogin
}

const LoginForm = ({ login, socialLogin, handleSubmit, error }) => {
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
        <Divider horizontal>OR</Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  )
}

export default connect(null, mapDispatchToProps)(reduxForm({ form: 'loginForm' })(LoginForm));
