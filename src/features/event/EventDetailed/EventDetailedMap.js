import React from 'react'
import { Segment, Icon } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <Icon name='marker' color='red' size='big' />

export const EventDetailedMap = ({ lat, lng }) => {
  const zoom = 14;
  return (
    <Segment attached='bottom' style={{padding: 0}}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDAAW_ScARCADGZd_V2NYqQXYBPRhYOCYA' }}
          defaultCenter={{ lat, lng }}
          defaultZoom={zoom}
        >
          <Marker
            lat={lat}
            lng={lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    </Segment>
  )
}
