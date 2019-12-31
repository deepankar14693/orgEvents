import React from 'react'
import { Segment, Container, Header, Image, Button, Icon } from 'semantic-ui-react'

const HomePage = (props) => {
  const { history } = props;
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          <Button size="huge" inverted onClick={() => history.push('/events')}>
            Get Started
            <Icon name="right arrow" inverted />
          </Button>
        </Header>
      </Container>
    </Segment>
  )
}

export default HomePage;
