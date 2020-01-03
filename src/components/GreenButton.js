import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {H3} from 'native-base';
import {withNavigation} from 'react-navigation';
import {useStoreActions} from 'easy-peasy';

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
});

const GreenButton = props => {
  const setScanning = useStoreActions(actions => actions.events.setScanning);
  return (
    <TouchableOpacity
      onPress={() => {
        setScanning(null);
        setTimeout(() => props.navigation.navigate(props.location), 500);
      }}>
      <View>
        <Image
          style={styles.button}
          source={require('../../assets/ButtonBg.png')}
        />
        <H3 style={styles.text}>{props.text}</H3>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(GreenButton);
