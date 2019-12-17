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
import {StyleSheet, Image} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {
  Header,
  Body,
  Title,
  Container,
  Content,
  Button,
  Text,
  H3,
  H1,
} from 'native-base';

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

export default props => {
  const [text, setText] = useState('');
  const [currUuid, _generateUUID] = useUuid();
  const {_read, _write} = useNFC(currUuid, setText);
  const hackers = useStoreState(state => state.hackers.items);
  const initialise = useStoreActions(actions => actions.hackers.initialise);
  useEffect(() => {
    initialise();
  }, [initialise]);
  console.log(hackers);
  return (
    <Container>
      <Header>
        <Image style={styles.image} source={require('../../nwplus_logo.png')} />
        <Body>
          <Title>nwHacks NFC</Title>
        </Body>
      </Header>
      <Content style={styles.content}>
        <Text>Hello</Text>
        <H3 style={styles.text}>
          This is an NFC app and I'm going SQL inject your NFC tag
        </H3>
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
      </Content>
    </Container>
  );
};
