import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { getMetricMetaInfo, timeToString, getDailyReminderValue, setLocalNotification, clearLocalNotification } from '../utils/helpers';
import SliderComp from './SliderComp';
import StepperComp from './StepperComp';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { white, purple } from '../utils/colors';
import { NavigationActions } from 'react-navigation';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={Platform.OS === 'ios'
      ? styles.iosSubmitBtn
      : styles.androidSubmitBtn}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
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

    this.props.dispatch(addEntry({ [ key ]: entry }));

    this.setState({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 });

    this.toHome( );

    submitEntry({ entry, key });

    clearLocalNotification( ).then( setLocalNotification );
  }

  reset = ( ) => {
    const key = timeToString( );

    this.props.dispatch(addEntry({[ key ]: getDailyReminderValue( )}));

    this.toHome( );

    removeEntry( key );
  }

  toHome = ( ) => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddEntry' }))
  }

  render( ) {
    const { increment, decrement, slide, submit, reset } = this;
    const { alreadyLogged } = this.props;
    const metaInfo = getMetricMetaInfo( );

    if ( alreadyLogged ) {
      return (
        <View style={styles.center}>
          <Ionicons name={Platform.OS === 'ios'
            ? 'ios-happy-outline'
            : 'md-happy'} size={100}/>
          <Text>Você já cadastrou as informações de hoje</Text>
          <TextButton style={{
            padding: 10
          }} onPress={reset}>Reset</TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <DateHeader date={new Date( ).toLocaleDateString( )}></DateHeader>

        {Object.keys( metaInfo ).map(key => {
          const {
            getIcon,
            type,
            ...rest
          } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key} style={styles.row}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 2,
    height: 45,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
})

const mapStateToProps = ( state ) => {
  const key = timeToString( );

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect( mapStateToProps )( AddEntry );
