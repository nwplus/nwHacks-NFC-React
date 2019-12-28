/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Spinner,
  Content,
  Card,
  CardItem,
  Button,
  Body,
  Text,
  H3,
  H1,
} from 'native-base';
import MenuButton from '../components/MenuButton';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#343338',
    padding: 40,
  },
  content: {
    margin: 10,
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
  card: {
    width: '100%',
    // border: '2px solid red',
  },
});

const Attendee = props => {
  console.log('Props: ', props);
  return (
    <Container style={styles.wrapper}>
      <MenuButton navigation={props.navigation} />
      <Content contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <CardItem>
            <Body>
              <Text>Hello</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Attendee;
