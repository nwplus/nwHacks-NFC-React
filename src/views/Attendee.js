/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {checkIn, modifyEvent, updateCoatCheck} from '../utils/firebase';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal, View, TextInput} from 'react-native';
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
  Input,
  Item,
} from 'native-base';
import MenuButton from '../components/MenuButton';
import {useStoreState, useStoreActions} from 'easy-peasy';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#343338',
    paddingTop: 100,
  },
  content: {
    margin: 10,
    flex: 3,
    flexWrap: 'nowrap',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 1,
    flexWrap: 'nowrap',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    alignSelf: 'center',
  },
  eventMetrics: {
    textAlign: 'right',
    paddingBottom: 13,
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
  incdecButtons: {
    backgroundColor: 'white',
    color: 'black',
    marginRight: 10,
  },
});

const Attendee = props => {
  const [search, setSearch] = useState('');
  const hackers = useStoreState(state => state.hackers.items);
  const filteredHackers =
    search === ''
      ? hackers
      : hackers.filter(
          hacker =>
            (hacker.firstname &&
              hacker.firstname.toLowerCase().includes(search.toLowerCase())) ||
            (hacker.lastname &&
              hacker.lastname.toLowerCase().includes(search.toLowerCase())) ||
            (hacker.email &&
              hacker.email.toLowerCase().includes(search.toLowerCase())),
        );
  const [showList, setShowList] = useState(false);
  const [selected, setSelected] = useState(null);
  const [user, setUser] = useState(null);
  const registered = useStoreState(state => state.registered.on);
  const setScanning = useStoreActions(actions => actions.events.setScanning);
  const mode = useStoreState(state => state.scan.scanMode);
  const uid = useStoreState(state => state.scan.uid);
  const hackerEmail = useStoreState(state => state.scan.hacker);
  const registeredApplicant = useStoreState(
    state => state.registered.selectedApplicant,
  );
  const events = useStoreState(state => state.events.all);
  const [coatCheck, setCoatCheck] = useState('');
  useEffect(() => {
    setCoatCheck(user ? (user.coatCheck ? user.coatCheck : -1) : -1);
  }, [user]);

  useEffect(() => {
    if (mode === 'hacker') {
      setUser(hackers.find(hacker => hacker.email === hackerEmail));
    } else if (mode === 'uid') {
      setUser(hackers.find(hacker => hacker.nfcID && hacker.nfcID === uid));
    }
  }, [hackerEmail, hackers, mode, uid]);
  useEffect(() => {
    if (registered) {
      setSelected(registeredApplicant);
    } else {
      setSelected(null);
    }
  }, [registered, registeredApplicant]);

  const GetApplicantStatus = () => {
    const baseStyles = {width: 200, textAlign: 'right'};
    if (user && user.tags) {
      if (user.tags['checked-in']) {
        return <Text style={[baseStyles, {color: 'green'}]}>Checked in!</Text>;
      } else if (user.tags.RSVP) {
        return <Text style={[baseStyles, {color: 'green'}]}>RSVPed</Text>;
      } else if (user.tags.accepted) {
        return <Text style={[baseStyles, {color: 'orange'}]}>Accepted</Text>;
      } else if (user.tags.rejected) {
        return <Text style={[baseStyles, {color: 'red'}]}>Rejected</Text>;
      }
    }
    return <Text style={{color: 'red'}}>No tags</Text>;
  };

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
          <Item style={{marginLeft: 20}}>
            <Icon name="ios-search" />
            <Input
              value={search}
              onChangeText={setSearch}
              placeholder="Search"
            />
          </Item>
          <Content>
            <List>
              {filteredHackers.map((hacker, i) => {
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
              <GetApplicantStatus />
            </Right>
          </ListItem>
          <CardItem>
            {user ? (
              <View
                style={{
                  flex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  flexWrap: 'nowrap',
                }}>
                <View style={styles.attendeeDetails}>
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
                </View>
                <ListItem>
                  <Left>
                    <Text>Coat Check #</Text>
                  </Left>
                  <Right>
                    <Input
                      value={coatCheck}
                      onChangeText={text => {
                        setCoatCheck(text);
                      }}
                      onEndEditing={() => {
                        updateCoatCheck(user.email, coatCheck);
                      }}
                      style={{
                        textAlign: 'right',
                      }}
                      keyboardType={'numeric'}
                    />
                  </Right>
                </ListItem>
                {!!events &&
                  events.map((event, i) => (
                    <ListItem key={i}>
                      <Left>
                        <Text>{event.name}</Text>
                      </Left>
                      <Right
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginRight: 20,
                        }}>
                        <Button
                          onPress={() =>
                            modifyEvent({
                              operation: 'inc',
                              event: event.name,
                              hacker: user.email,
                            })
                          }
                          style={styles.incdecButtons}>
                          <Icon
                            style={styles.incdecButtons}
                            name="arrow-back"
                          />
                        </Button>
                        <Text style={styles.eventMetrics}>
                          {user.events && user.events[event.name]
                            ? user.events[event.name].count
                            : 0}
                        </Text>
                        <Button
                          onPress={() =>
                            modifyEvent({
                              operation: 'dec',
                              event: event.name,
                              hacker: user.email,
                            })
                          }
                          style={styles.incdecButtons}>
                          <Icon
                            style={styles.incdecButtons}
                            name="arrow-forward"
                          />
                        </Button>
                      </Right>
                    </ListItem>
                  ))}
              </View>
            ) : (
              <Body style={styles.attendeeDetails}>
                {!registered ? (
                  <Button
                    onPress={() => setShowList(true)}
                    small
                    style={styles.assignButton}>
                    <Text>Select Hacker</Text>
                  </Button>
                ) : null}
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
          onPress={() => {
            setScanning(null);
            props.navigation.navigate('Scan');
          }}>
          <Text>Scan</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Attendee;
