import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

class StepperComp extends Component {
  render( ) {
    const {
      max,
      unit,
      step,
      value,
      onIncrement,
      onDecrement
    } = this.props;

    return (
      <View>
        <View>
          <TouchableOpacity onPress={onDecrement}>
            <FontAwesome name="minus" size={30} color={"black"}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={onIncrement}>
            <FontAwesome name="plus" size={30} color={"black"}/>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{value}</Text>
          <Text>{unit}</Text>
        </View>
      </View>
    );
  }
}

export default StepperComp;
