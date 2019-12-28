/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Spinner, Content, Button, Text, H3, H1} from 'native-base';
import MenuButton from '../components/MenuButton';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#343338',
    padding: 60,
  },
  content: {
    margin: 20,
    flex: 1,
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    marginVertical: 10,
    justifyContent: 'center',
    backgroundColor: '#18CDCD',
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
  },
  image: {
    width: 30,
    height: 30,
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },
});

const NoAttendee = props => {
  return (
    <Container style={styles.wrapper}>
      <MenuButton navigation={props.navigation} />
      <Content contentContainerStyle={styles.content}>
        <Content style={styles.header}>
          <H3 style={styles.text}>Attendee ID</H3>
          <Text style={styles.text}>This is a NO TEXT! component</Text>
        </Content>
      </Content>
    </Container>
  );
};

export default NoAttendee;
