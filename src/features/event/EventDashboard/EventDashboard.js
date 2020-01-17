import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import { connect } from 'react-redux'
import { deleteEvent } from '../eventActions'

class EventDashboard extends Component {

  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
  }

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h3>Activity Feed</h3>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.events
})

const mapDispatchToProps = {
  deleteEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
