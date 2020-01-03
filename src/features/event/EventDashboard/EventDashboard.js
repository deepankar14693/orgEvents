import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'
import { connect } from 'react-redux'
import { createEvent, updateEvent, deleteEvent } from '../eventActions'
import cuid from 'cuid'

class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null
  }

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    })
  }

  handleFormCancel = () => {
    this.setState({
      isOpen: false
    })
  }

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    this.props.createEvent(newEvent);
    this.setState({
      isOpen: false
    })
  }

  handleSelectEvent = (event) => {
    this.setState({
      selectedEvent: event,
      isOpen: true
    })
  }

  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    })
  }

  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
  }

  render() {
    const { isOpen, selectedEvent } = this.state;
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} selectEvent={this.handleSelectEvent} deleteEvent={this.handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button positive content="Create Event" onClick={this.handleCreateFormOpen} />
          {isOpen &&
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0}
              cancelFormOpen={this.handleFormCancel}
              createEvent={this.handleCreateEvent}
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent} />
          }
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.events
})

const mapDispatchToProps = {
  createEvent,
  updateEvent,
  deleteEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
