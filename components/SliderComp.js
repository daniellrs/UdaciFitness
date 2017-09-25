import React, { Component } from 'react';
import { View, Text, Slider } from 'react-native';

class SliderComp extends Component {
  render( ) {
    const { max, unit, step, value, onChange } = this.props;
    return (
      <View>
        <Slider step={step} value={value} maximumValue={max} minimumValue={0} onValueChange={onChange}/>
        <View>
          <Text>{value}</Text>
          <Text>{unit}</Text>
        </View>
      </View>
    );
  }
}

export default SliderComp;
