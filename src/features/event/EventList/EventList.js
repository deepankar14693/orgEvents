import React, { Component } from 'react'
import EventListItem from './EventListItem'

export default class EventList extends Component {
  render() {
    return (
      <>
        {this.props.events.map((event, index) => {
          return (
            <EventListItem key={index} event={event} />
          )
        })}
      </>
    )
  }
}
