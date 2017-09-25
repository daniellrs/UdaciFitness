import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import SliderComp from './SliderComp';
import StepperComp from './StepperComp';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = ( metric ) => {
    const { max, step } = getMetricMetaInfo( metric );

    this.setState(( state ) => {
      const count = state[metric] + step;

      return {
        ...state,
        [ metric ]: count > max
          ? max
          : count
      }
    });
  }

  decrement = ( metric ) => {
    const { step } = getMetricMetaInfo( metric );

    this.setState(( state ) => {
      const count = state[metric] - step;

      return {
        ...state,
        [ metric ]: count < 0
          ? 0
          : count
      }
    });
  }

  slide = ( metric, value ) => {
    this.setState(( ) => ({ [ metric ]: value }));
  }

  submit = ( ) => {
    const key = timeToString( );
    const entry = this.state;

    this.setState({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 });
  }

  reset = ( ) => {
    const key = timeToString( );
  }

  render( ) {
    const { increment, decrement, slide, submit, reset } = this;
    const { alreadyLogged } = this.props;
    const metaInfo = getMetricMetaInfo( );

    if ( alreadyLogged ) {
      return (
        <View>
          <Ionicons name="ios-happy-outline" size={100}/>
          <Text>Você já cadastrou as informações de hoje</Text>
          <TextButton onPress={reset}>Reset</TextButton>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={new Date( ).toLocaleDateString( )}></DateHeader>

        {Object.keys( metaInfo ).map(key => {
          const {
            getIcon,
            type,
            ...rest
          } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon( )}
              {type === 'slider'
                ? <SliderComp value={value} onChange={( value ) => slide( key, value )} {...rest}/>
                : <StepperComp value={value} onIncrement={( ) => increment( key )} onDecrement={( ) => decrement( key )} {...rest}/>}
            </View>
          )
        })}
        <SubmitBtn onPress={submit}/>
      </View>
    )
  }
}

export default AddEntry;
