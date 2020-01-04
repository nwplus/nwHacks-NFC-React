/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import useNFC from '../utils/nfc';
import {StyleSheet} from 'react-native';
import {
  Container,
  Spinner,
  Content,
  Button,
  Text,
  H3,
  Icon,
  Toast,
} from 'native-base';
import MenuButton from '../components/MenuButton';
import {modifyEvent} from '../utils/firebase';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {View} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#343338',
    padding: 60,
  },
  content: {
    margin: 20,
    flex: 3,
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 100,
  },
  button: {
    marginVertical: 10,
    justifyContent: 'center',
    backgroundColor: '#18CDCD',
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 5,
  },
  image: {
    width: 30,
    height: 30,
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },
});

const Scan = props => {
  const [isScanning, setScanning] = useState(false);
  const {_read, nfc} = useNFC(setScanning);
  const hackers = useStoreState(state => state.hackers.items);
  const event = useStoreState(state => state.events.scannedEvent);
  const setScanMode = useStoreActions(actions => actions.scan.setScanMode);
  const [scanned, setScanned] = useState(null);
  const [hackerRef, setHackerRef] = useState(null);
  const startScan = async () => {
    const uid = await _read();
    if (uid == null) {
      return;
    }
    const hacker = hackers.find(hacker => hacker.nfcID && hacker.nfcID === uid);
    if (event === null) {
      if (hacker) {
        setScanMode({mode: 'hacker', payload: hacker.email});
      } else {
        setScanMode({mode: 'uid', payload: uid});
      }
      setTimeout(() => props.navigation.navigate('Attendee'), 500);
    } else {
      if (!hacker) {
        Toast.show({
          text: 'Not hacker assigned to this nfc chip',
          duration: 5000,
          type: 'danger',
        });
        return null;
      }
      const count =
        (hacker.events
          ? hacker.events[event]
            ? hacker.events[event].count
            : 0
          : 0) + 1;

      await modifyEvent({
        operation: 'inc',
        event: event,
        hacker: hacker.email,
        count,
      });
      setHackerRef(hacker.email);
      Toast.show({
        text: `Successfully checked in ${hacker.firstname} for ${event}`,
        duration: 5000,
        type: 'success',
      });
    }
  };

  useEffect(() => {
    if (hackerRef) {
      setScanned(hackers.find(hacker => hacker.email === hackerRef));
    }
  }, [hackerRef, hackers]);

  return (
    <Container style={styles.wrapper}>
      <MenuButton navigation={props.navigation} />
      <Content contentContainerStyle={styles.content}>
        <Content style={styles.header}>
          <H3 style={styles.text}>NFC Tag Scanner</H3>
          {event ? <Text style={styles.text}>Checking in: {event}</Text> : null}
          <Text style={styles.text}>
            {nfc ? 'NFC Enabled!' : 'NFC not supported.'}
          </Text>
          {event && scanned ? (
            <Text style={{textAlign: 'center', fontSize: 26, color: 'white'}}>
              Checkins:{' '}
              {!!scanned &&
                !!scanned.events[event] &&
                scanned.events[event].count}
            </Text>
          ) : null}
          <Icon
            name="nfc"
            type="MaterialCommunityIcons"
            style={{
              marginTop: 100,
              fontSize: 200,
              color: 'white',
              height: '100%',
            }}
          />
        </Content>
        <View contentContainerStyle={styles.body}>
          {/* <H1 style={styles.text}>{text}</H1> */}
          {isScanning ? (
            <>
              <Text style={styles.text}>Scanning...</Text>
              <Spinner color="#18CDCD" />
            </>
          ) : (
            <Button style={styles.button} onPress={() => startScan()}>
              <Text style={styles.text}>Scan</Text>
            </Button>
          )}
        </View>
      </Content>
    </Container>
  );
};

Scan.navigationOptions = {
  header: null,
};

export default Scan;
