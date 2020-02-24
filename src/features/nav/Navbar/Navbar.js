import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import SignedOutMenu from '../Menus/SignedOutMenu'
import SignedInMenu from '../Menus/SignedInMenu'
import { openModal } from '../../modals/modalActions'
import { logout } from '../../auth/authActions'
import { withFirebase } from 'react-redux-firebase'
// import {} from 'redux-firestore';

const actions = {
  openModal,
  logout
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth
})

class Navbar extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal')
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    // this.props.logout();
    this.props.firebase.logout();     //logout function is in firebase therefore withFirebase HOC is used to get firebase instance 
    this.props.history.push('/');
  }

  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/" exact header>
            <img src="/assets/logo.png" />
            Organize Events
          </Menu.Item>
          <Menu.Item exact name="Events" as={NavLink} to="/events" />
          {authenticated &&
            <>
              <Menu.Item name="People" as={NavLink} to="/people" />
              <Menu.Item>
                <Button as={Link} to="/createEvent" floated="right" positive inverted content="Create Event" />
              </Menu.Item>
            </>
          }
          {authenticated ? <SignedInMenu signOut={this.handleSignOut} auth={auth} /> : <SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />}
        </Container>
      </Menu>
    )
  }
}

export default withRouter(withFirebase(connect(mapStateToProps, actions)(Navbar)));
