import React from 'react';
import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import { H3} from 'native-base';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
    height: '70%',
    zIndex: -1,
    position: 'absolute',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginVertical: '7%',
  },
})

const GreenButton = props => {
    return (
        <View>
          <Image
            style={styles.button}
            source={require('../../assets/ButtonBg.png')}
          />
          <TouchableHighlight onPress={() => props.navigation.navigate(props.location)} >
            <H3 style={styles.text}>{props.text}</H3>
          </TouchableHighlight>
        </View>
    );
};

export default withNavigation(GreenButton);