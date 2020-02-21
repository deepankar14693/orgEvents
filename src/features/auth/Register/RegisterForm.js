import React, { Component } from 'react';
import { Form, Segment, Button, Label } from 'semantic-ui-react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { connect } from 'react-redux';
import { registerUser } from '../authActions';
import { withFirestore } from 'react-redux-firebase';
import { closeModal } from '../../modals/modalActions';
import { combineValidators, isRequired } from 'revalidate';

const mapDispatchToProps = {
  registerUser,
  closeModal
}

const mapStateToProps = (state) => ({
  uid: state.firebase.auth.uid
})

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
})


class RegisterForm extends Component {

  onFormSubmit = async (values) => {
    try {
      await this.props.registerUser(values);  //this is for registering user in firebase and it automatically gets authenticated as well (state.firebase.auth)
      let newUser = {
        displayName: values.displayName,
        createdAt: this.props.firestore.FieldValue.serverTimestamp()
      }
      const uid = this.props.uid;
      await this.props.firestore.set(`users/${uid}`, { ...newUser }) //this is for setting user profile in firestore
      this.props.closeModal();
    }
    catch (err) {
      throw new SubmissionError({
        _error: err.message
      })
    }
  }

  render() {

    const { handleSubmit, error, invalid, submitting } = this.props;

    return (
      <div>
        <Form error size="large" onSubmit={handleSubmit(this.onFormSubmit)}>
          <Segment>
            <Field
              name="displayName"
              type="text"
              component={TextInput}
              placeholder="Known As"
            />
            <Field
              name="email"
              type="text"
              component={TextInput}
              placeholder="Email"
            />
            <Field
              name="password"
              type="password"
              component={TextInput}
              placeholder="Password"
            />
            {error && <Label basic color='red'>{error}</Label>}
            <Button disabled={invalid || submitting} fluid size="large" color="teal">
              Register
          </Button>
          </Segment>
        </Form>
      </div>
    )
  }
}

export default (withFirestore(connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'registerForm', validate })(RegisterForm))));
