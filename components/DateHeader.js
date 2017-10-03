import React, { Component } from 'react';
import { Text } from 'react-native';
import { purple } from '../utils/colors'

class DateHeader extends Component {
  render( ) {
    const { date } = this.props;

    return (
      <Text style={{
        color: purple,
        fontSize: 25
      }}>{date}</Text>
    );
  }
}

export default DateHeader;
