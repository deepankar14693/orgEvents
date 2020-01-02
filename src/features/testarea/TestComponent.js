import React, { Component } from 'react';
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from './testActions';
import { Button } from 'semantic-ui-react';

class TestComponent extends Component {

  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>the answer is: {data}</h3>
        <Button onClick={incrementCounter} positive content="Increment" />
        <Button onClick={decrementCounter} negative content="Decrement" />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.test.data
})

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
