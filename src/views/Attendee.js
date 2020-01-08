/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  checkIn,
  modifyEvent,
  updateCoatCheck,
  unRegisterApplicant,
} from '../utils/firebase';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
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
  Spinner,
} from 'native-base';
import MenuButton from '../components/MenuButton';
import {useStoreState, useStoreActions} from 'easy-peasy';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#343338',
    height: '100%',
  },
  content: {
    margin: 10,
    flex: 3,
    flexWrap: 'nowrap',
    paddingTop: 40,
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
    maxHeight: '60%',
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
    bottom: 0,
    justifyContent: 'center',
  },
  assignButton: {
    backgroundColor: '#2D2937',
  },
  incdecButtons: {
    backgroundColor: 'white',
    color: 'black',
    marginHorizontal: 0,
    padding: 1,
    fontSize: 24,
    height: 40,
    width: 40,
    justifyContent: 'center',
    textAlign: 'center',
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
            (hacker.firstname &&
              hacker.lastname &&
              `${hacker.firstname} ${hacker.lastname}`
                .toLowerCase()
                .includes(search.toLowerCase())) ||
            (hacker.email &&
              hacker.email.toLowerCase().includes(search.toLowerCase())),
        );
  const [showList, setShowList] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setCoatCheck(user ? (user.coatCheck ? user.coatCheck : '-1') : '-1');
  }, [user]);

  const dim = Dimensions.get('window');
  const deTagTop =
    Platform.OS === 'ios' && dim.height >= 812 ? {top: 65} : {top: 20};

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
    setLoading(true);
    await checkIn(email, uid);
    setLoading(false);
    setSelected(null);
    Toast.show({
      text: `Successfully checked in ${name}`,
      duration: 3000,
      type: 'success',
    });
    props.navigation.navigate('Scan');
  };
  const deTagPressed = async (email, name) => {
    Alert.alert(
      'Are you sure you want to detag?',
      `You are about to detag ${name} which will also uncheck them in.`,
      [
        {
          text: 'DETAG',
          onPress: () => unRegister(email, name),
          style: 'destructive',
        },
        {
          text: 'cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  };
  const unRegister = async (email, name) => {
    setLoading(true);
    await unRegisterApplicant(email);
    setLoading(false);
    setSelected(null);
    Toast.show({
      text: `Successfully unregistered ${name}`,
      duration: 3000,
      type: 'success',
    });
  };
  return (
    <SafeAreaView style={styles.wrapper}>
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
      {loading ? (
        <Spinner style={{position: 'absolute', width: '100%', top: 35}} />
      ) : null}
      {!!user && user.nfcID ? (
        <Button
          onPress={() =>
            deTagPressed(user.email, `${user.firstname} ${user.lastname}`)
          }
          small
          danger
          style={[{position: 'absolute', right: 26, zIndex: 3}, deTagTop]}>
          <Text>DETAG</Text>
        </Button>
      ) : null}
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
                  <Text>{user.nfcID ? user.nfcID : ''}</Text>
                </View>
                <ListItem>
                  <Left>
                    <Text>Coat Check #</Text>
                  </Left>
                  <Right style={{height: 30}}>
                    <Input
                      value={coatCheck}
                      onChangeText={text => {
                        setCoatCheck(text);
                      }}
                      onEndEditing={async () => {
                        setLoading(true);
                        await updateCoatCheck(user.email, coatCheck);
                        setLoading(false);
                      }}
                      style={{
                        textAlign: 'center',
                        borderWidth: 2,
                        width: 50,
                        right: -10,
                      }}
                      keyboardType={'numeric'}
                    />
                  </Right>
                </ListItem>
                <ScrollView>
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
                            marginRight: 35,
                          }}>
                          <Button
                            onPress={async () => {
                              setLoading(true);
                              const count =
                                (user.events
                                  ? user.events[event]
                                    ? user.events[event].count
                                    : 0
                                  : 0) + 1;
                              await modifyEvent({
                                operation: 'dec',
                                event: event.name,
                                hacker: user.email,
                                count,
                              });
                              setLoading(false);
                            }}
                            style={styles.incdecButtons}>
                            <Text
                              style={styles.incdecButtons}
                              name="arrow-forward">
                              -
                            </Text>
                          </Button>
                          <Text style={styles.eventMetrics}>
                            {user.events && user.events[event.name]
                              ? user.events[event.name].count
                              : 0}
                          </Text>
                          <Button
                            onPress={async () => {
                              setLoading(true);
                              const count =
                                (user.events
                                  ? user.events[event]
                                    ? user.events[event].count
                                    : 0
                                  : 0) + 1;
                              await modifyEvent({
                                operation: 'inc',
                                event: event.name,
                                hacker: user.email,
                                count,
                              });
                              setLoading(false);
                            }}
                            style={styles.incdecButtons}>
                            <Text
                              style={styles.incdecButtons}
                              name="arrow-back">
                              +
                            </Text>
                          </Button>
                        </Right>
                      </ListItem>
                    ))}
                </ScrollView>
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
                ) : !selected ? (
                  <Text
                    style={{textAlign: 'center', color: 'red', fontSize: 20}}>
                    No Applicant Selected on the admin portal
                  </Text>
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
    </SafeAreaView>
  );
};

export default Attendee;
