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
    // fontFamily: 'Apercu Pro',
  },
  image: {
    width: 30,
    height: 30,
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  attendeeRoles: {
    color: '#19CBCB',
    textAlign: 'center',
  },
  attendeeDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
  },
  eventMetrics: {
    display: 'flex',
    textAlign: 'right',
  },
  processButton: {
    width: 80,
    backgroundColor: '#2D2937',
  },
  scanAgainButton: {
    backgroundColor: '#19CBCB',
  },
});

const Attendee = props => {
  console.log('Props: ', props);
  const user = {
    firstname: 'John',
    lastname: 'Smith',
    email: 'john.smith@gmail.com',
    hackerRoleDesigner: false,
    hackerRoleDeveloper: true,
    hackerRoleHardware: true,
    nfcId: '0409893AE74C812',
  };
  return (
    <Container style={styles.wrapper}>
      <MenuButton navigation={props.navigation} />
      <Content contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <ListItem>
            <Left>
              {user ? (
                <Text>
                  {user.firstname} {user.lastname}
                </Text>
              ) : (
                <Text>No Applicant ID</Text>
              )}
            </Left>
            <Right>
              <Button small style={styles.processButton}>
                <Text>Process</Text>
              </Button>
            </Right>
          </ListItem>
          <CardItem>
            <Body style={styles.attendeeDetails}>
              {user.hackerRoleDesigner && (
                <Text style={styles.attendeeRoles}>Designer</Text>
              )}
              {user.hackerRoleDeveloper && (
                <Text style={styles.attendeeRoles}>Developer</Text>
              )}
              {user.hackerRoleHardware && (
                <Text style={styles.attendeeRoles}>Hardware</Text>
              )}
              <Text>{user.email}</Text>
              <Text>{user.nfcId}</Text>
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
        <Button style={styles.scanAgainButton}>
          <Text>Scan Again</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Attendee;
