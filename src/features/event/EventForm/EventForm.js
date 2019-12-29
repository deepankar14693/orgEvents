import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

class EventForm extends Component {

  state = {
    eventTitle: '',
    eventDate: '',
    eventCity: '',
    eventVenue: '',
    hostedBy: ''
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { cancelFormOpen } = this.props;
    const { eventTitle, eventDate, eventCity, eventVenue, hostedBy } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input name='eventTitle' value={eventTitle} onChange={this.handleInputChange} placeholder="Event Title" />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input type="date" name='eventDate' value={eventDate} onChange={this.handleInputChange} placeholder="Event Date" />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name='eventCity' value={eventCity} onChange={this.handleInputChange} placeholder="City event is taking place" />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input name='eventVenue' value={eventVenue} onChange={this.handleInputChange} placeholder="Enter the venue of the event" />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input name='hostedBy' value={hostedBy} onChange={this.handleInputChange} placeholder="Enter the name of person hosting" />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={cancelFormOpen}>Cancel</Button>
        </Form>
      </Segment>
    )
  }
}

export default EventForm;
