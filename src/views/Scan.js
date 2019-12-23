/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import useNFC from '../utils/nfc';
import useUuid from '../utils/uuid';
import {StyleSheet} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Container, Content, Button, Text, H3, H1} from 'native-base';

const styles = StyleSheet.create({
  content: {
    margin: 20,
  },
  button: {
    marginVertical: 10,
    justifyContent: 'center',
  },
  text: {
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
  //Set navigation options:

  const [text, setText] = useState('');
  const [currUuid, _generateUUID] = useUuid();
  const {getNFC, _read, _write} = useNFC(currUuid, setText);

  //Example of getting an item from easy-peasy store
  const isLoggedIn = useStoreState(state => state.auth.loggedIn);

  //Example of getting actions or thunks from easy-peasy store
  const initialise = useStoreActions(actions => actions.initialise);
  const logout = useStoreActions(actions => actions.auth.logout);
  //initialize store
  useEffect(() => {
    initialise();
  }, [initialise]);
  if (!isLoggedIn) {
    props.navigation.navigate('Auth');
  }
  return (
    <Container>
      <Button onPress={() => props.navigation.navigate('Test')}>
        <Text>Test navigation!</Text>
      </Button>
      <Content style={styles.content}>
        <H3 style={styles.text}>
          This is an NFC app and I'm going SQL inject your NFC tag
        </H3>
        {getNFC ? null : (
          <Text style={styles.text}>
            {getNFC ? 'NFC Enabled!' : 'NFC not supported.'}
          </Text>
        )}
        <Button style={styles.button} onPress={_read}>
          <Text>Read</Text>
        </Button>
        <Button style={styles.button} onPress={_write}>
          <Text>Write</Text>
        </Button>
        <Button style={styles.button} onPress={_generateUUID}>
          <Text>Generate UUID: {currUuid}</Text>
        </Button>
        <H1 style={styles.text}>{text}</H1>
        <Button onPress={logout}>
          <Text>logout!</Text>
        </Button>
      </Content>
    </Container>
  );
};

Scan.navigationOptions = {
  header: null,
};

export default Scan;
