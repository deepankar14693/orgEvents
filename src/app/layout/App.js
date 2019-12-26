import React, { Component } from 'react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import Navbar from '../../features/nav/Navbar/Navbar';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Container className="main">
          <EventDashboard />
        </Container>
      </>
    )
  }
}

export default App;
