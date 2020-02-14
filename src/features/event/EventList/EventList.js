import React, { Component } from 'react'
import EventListItem from './EventListItem'

export default class EventList extends Component {
  render() {
    const { events, deleteEvent } = this.props
    return (
      <>
        {events && events.map((event, index) => {
          return (
            <EventListItem key={event.id} event={event} deleteEvent={deleteEvent} />
          )
        })}
      </>
    )
  }
}
