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
  Content,
  Card,
  CardItem,
  ListItem,
  Button,
  Body,
  Text,
  Right,
  Left,
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
  },
  eventMetrics: {
    display: 'flex',
    textAlign: 'right',
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
              <Text>Image goes here</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>Designer</Text>
              <Text>someone@gmail.com</Text>
              <Text>01787 656592</Text>
            </Body>
          </CardItem>
          <ListItem>
            <Left>
              <Text>Coat Check #</Text>
            </Left>
            <Right>
              <Text style={styles.eventMetrics}>58</Text>
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Lunch</Text>
            </Left>
            <Right>
              <Text style={styles.eventMetrics}>1</Text>
            </Right>
          </ListItem>
        </Card>
      </Content>
    </Container>
  );
};

export default Attendee;
