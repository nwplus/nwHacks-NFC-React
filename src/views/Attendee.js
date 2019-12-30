/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {checkIn} from '../utils/firebase';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal, View} from 'react-native';
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
  List,
  Header,
  Title,
  Icon,
  Toast,
} from 'native-base';
import MenuButton from '../components/MenuButton';
import {useStoreState} from 'easy-peasy';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#343338',
    paddingTop: 100,
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
    width: '90%',
    alignSelf: 'center',
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
    position: 'absolute',
    width: '100%',
    bottom: 20,
    justifyContent: 'center',
  },
  assignButton: {
    backgroundColor: '#2D2937',
  },
});

const Attendee = props => {
  const hackers = useStoreState(state => state.hackers.items);
  const uid = props.navigation.getParam('uid', '');
  const user = hackers.find(hacker => hacker.nfcID && hacker.nfcID === uid);
  const [showList, setShowList] = useState(false);
  const [selected, setSelected] = useState(null);
  const checkInApplicant = async (email, name) => {
    await checkIn(email, uid);
    setSelected(null);
    Toast.show({
      text: `Successfully checked in ${name}`,
      duration: 3000,
      type: 'success',
    });
    props.navigation.navigate('Scan');
  };
  return (
    <Container style={styles.wrapper}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showList}
        onRequestClose={() => {
          console.log(selected);
          setShowList(false);
        }}>
        <Container>
          <Header>
            <Left>
              <Button onPress={() => setShowList(false)} transparent>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={{width: 200}}>Select a Hacker</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <List>
              {hackers.map((hacker, i) => {
                return (
                  <ListItem
                    key={hacker.email}
                    onPress={() => {
                      setSelected({
                        email: hacker.email,
                        firstname: hacker.firstname,
                        lastname: hacker.lastname,
                      });
                      setShowList(false);
                    }}>
                    <Text>
                      {!!hacker.firstname && hacker.firstname}{' '}
                      {!!hacker.lastname && hacker.lastname}
                    </Text>
                  </ListItem>
                );
              })}
            </List>
          </Content>
        </Container>
      </Modal>
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
                <Body>
                  <Text>No Applicant</Text>
                  <Text>ID: {uid}</Text>
                </Body>
              )}
            </Left>
            <Right>
              {!!user && (
                <Button
                  onPress={() =>
                    props.navigation.navigate('Details', {email: user.email})
                  }
                  small
                  style={styles.processButton}>
                  <Text>Details</Text>
                </Button>
              )}
            </Right>
          </ListItem>
          <CardItem>
            {user ? (
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
            ) : (
              <Body style={styles.attendeeDetails}>
                <Button
                  onPress={() => setShowList(true)}
                  small
                  style={styles.assignButton}>
                  <Text>Select Hacker</Text>
                </Button>
                {selected ? (
                  <View
                    style={{
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '70%',
                    }}>
                    <Title style={{marginBottom: 20}}>Selected:</Title>
                    <Text style={{textAlign: 'center', fontSize: 22}}>
                      {selected.firstname} {selected.lastname}
                    </Text>
                    <Text style={{marginBottom: 20}}>{selected.email}</Text>
                    <Button
                      onPress={() =>
                        checkInApplicant(
                          selected.email,
                          `${selected.firstname} ${selected.lastname}`,
                        )
                      }
                      loading
                      small
                      style={styles.assignButton}>
                      <Text>Check In</Text>
                    </Button>
                  </View>
                ) : null}
              </Body>
            )}
          </CardItem>
        </Card>
        <Button
          style={styles.scanAgainButton}
          onPress={() => props.navigation.navigate('Scan')}>
          <Text>Scan Again</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Attendee;
