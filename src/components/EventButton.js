import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'native-base';

const EventButton = props => {
  const {
    event: {name},
    pressed,
  } = props;
  return (
    <View>
      <Button style={styles.eventButton} onPress={() => pressed()}>
        <Text style={styles.eventButtonText}>{name}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  eventButton: {
    backgroundColor: '#2D2937',
    margin: 10,
    marginBottom: 0,
  },
  eventButtonText: {
    color: 'white',
    marginLeft: 20,
  },
});

export default EventButton;
