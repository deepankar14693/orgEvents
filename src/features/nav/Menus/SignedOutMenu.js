import React from 'react'
import { Menu, Button } from 'semantic-ui-react'

const SignedOutMenu = (props) => {
  return (
    <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={props.signIn} />
      <Button basic inverted content="Register" style={{ marginLeft: '0.5em' }} onClick={props.register} />
    </Menu.Item>
  )
}

export default SignedOutMenu;
