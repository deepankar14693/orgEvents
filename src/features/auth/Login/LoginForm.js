import React, { Component } from 'react'
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login, socialLogin } from '../authActions';
import { connect } from 'react-redux';
import SocialLogin from '../SocialLogin/SocialLogin';
import { withFirestore } from 'react-redux-firebase';
import { combineValidators, isRequired } from 'revalidate';

const mapDispatchToProps = {
  login,
  socialLogin
}

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password')
})

class LoginForm extends Component {

  onSocialLogin = (provider) => {
    const firestore = this.props.firestore;
    this.props.socialLogin(provider, firestore)
  }

  render() {
    const { login, handleSubmit, error, invalid, submitting } = this.props;
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
          <Button disabled={invalid || submitting} fluid size='large' color='teal'>
            Login
          </Button>
          <Divider horizontal>OR</Divider>
          <SocialLogin socialLogin={this.onSocialLogin} />
        </Segment>
      </Form>
    )
  }
}

export default withFirestore(connect(null, mapDispatchToProps)(reduxForm({ form: 'loginForm', validate })(LoginForm)));
