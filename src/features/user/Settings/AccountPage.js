import React from 'react';
import { Segment, Header, Form, Divider, Label, Button, Icon } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { combineValidators, composeValidators, isRequired, matchesField } from 'revalidate';

const validate = combineValidators({
  password: isRequired({ message: 'Please enter a password' }),
  confirmPassword: composeValidators(
    isRequired({ message: 'Please confirm your new password' }),
    matchesField('password')({ message: 'Passwords do not match' })
  )()
})

const Account = ({ handleSubmit, error, invalid, submitting, updatePassword, providerId }) => {
  return (
    <Segment>
      <Header dividing size="large" content="Account" />

      {providerId && providerId === 'password' &&
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to update your account settings</p>
          <Form error onSubmit={handleSubmit(updatePassword)}>
            <Field
              width={8}
              name="password"
              type="password"
              pointing="left"
              inline={true}
              component={TextInput}
              basic={true}
              placeholder="New Password"
            />
            <Field
              width={8}
              name="confirmPassword"
              type="password"
              inline={true}
              basic={true}
              pointing="left"
              component={TextInput}
              placeholder="Confirm Password"
            />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Divider />
            <Button disabled={invalid || submitting} size="large" positive content="Update Password" />
          </Form>
        </div>
      }

      {providerId && providerId === 'facebook.com' &&
        <div style={{ marginTop: 10 }}>
          <Header color="teal" sub content="Facebook Account" />
          <p>Please visit Facebook to update your account settings</p>
          <Button type="button" color="facebook">
            <Icon name="facebook" />
            Go to Facebook
        </Button>
        </div>
      }

      {providerId && providerId === 'google.com' &&
        <div style={{ marginTop: 10 }}>
          <Header color="teal" sub content="Google Account" />
          <p>Please visit Google to update your account settings</p>
          <Button type="button" color="google plus">
            <Icon name="google plus" />
            Go to Google
        </Button>
        </div>
      }

    </Segment>
  );
};

export default reduxForm({ form: 'accountUpdateForm', validate })(Account);
