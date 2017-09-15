import React, { Component } from 'react';
import { Text } from 'react-native';

class DateHeader extends Component {
  render() {
    const { date } = this.props;

    return (
      <Text>{date}</Text>
    );
  }
}

export default DateHeader;
