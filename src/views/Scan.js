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
import {Container, Spinner, Content, Button, Text, H3, H1} from 'native-base';
import MenuButton from '../components/MenuButton';
import {getUserFromUid} from '../utils/firebase';
import {useStoreActions, useStoreState} from 'easy-peasy';

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

const Scan = props => {
  const getUser = async uid => {
    setLoading(true);
    const user = await getUserFromUid(uid);
    setLoading(false);
    if (user) {
      //This is page for user
      props.navigation.navigate('Test', {user});
    } else {
      //This is page for no user
      props.navigation.navigate('Test', {uid});
    }
  };

  const [isScanning, setScanning] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {_read, nfc} = useNFC(setScanning, getUser);

  useEffect(() => {
    _read();
  }, [_read]);

  return (
    <Container style={styles.wrapper}>
      <MenuButton navigation={props.navigation} />
      <Content contentContainerStyle={styles.content}>
        <Content style={styles.header}>
          <H3 style={styles.text}>NFC Tag Scanner</H3>
          <Text style={styles.text}>
            {nfc ? 'NFC Enabled!' : 'NFC not supported.'}
          </Text>
          {isLoading ? <Spinner color="#18CDCD" /> : null}
        </Content>
        <Content contentContainerStyle={styles.body}>
          {/* <H1 style={styles.text}>{text}</H1> */}
          {isScanning ? (
            <>
              <Text style={styles.text}>Scanning...</Text>
              <Spinner color="#18CDCD" />
            </>
          ) : (
            <Button style={styles.button} onPress={() => _read()}>
              <Text style={styles.text}>Scan</Text>
            </Button>
          )}
        </Content>
      </Content>
    </Container>
  );
};

Scan.navigationOptions = {
  header: null,
};

export default Scan;
