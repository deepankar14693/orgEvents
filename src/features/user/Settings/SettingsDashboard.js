import React from 'react'
import { Grid } from 'semantic-ui-react'
import SettingsNav from './SettingsNav'
import { Route, Redirect, Switch } from 'react-router-dom'
import BasicPage from './BasicPage'
import AboutPage from './AboutPage'
import PhotosPage from './PhotosPage'
import AccountPage from './AccountPage'
import { connect } from 'react-redux'
import { updatePassword } from '../../auth/authActions'
import { updateProfile } from '../userActions';

const mapDispatchToProps = {
  updatePassword, updateProfile
}

const mapStateToProps = (state) => ({
  providerId: state.firebase.auth.isLoaded && state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
})

const SettingsDashboard = (props) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route path="/settings/basic" component={() => <BasicPage initialValues={props.user} updateProfile={props.updateProfile} />} />
          <Route path="/settings/about" component={() => <AboutPage initialValues={props.user} updateProfile={props.updateProfile} />} />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route path="/settings/account" component={() => <AccountPage updatePassword={props.updatePassword} providerId={props.providerId} />} />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDashboard);
