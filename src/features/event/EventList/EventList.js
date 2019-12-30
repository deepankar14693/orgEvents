import React, { Component } from 'react'
import EventListItem from './EventListItem'

export default class EventList extends Component {
  render() {
    const { events, selectEvent, deleteEvent } = this.props
    return (
      <>
        {events.map((event, index) => {
          return (
            <EventListItem key={index} event={event} selectEvent={selectEvent} deleteEvent={deleteEvent} />
          )
        })}
      </>
    )
  }
}
