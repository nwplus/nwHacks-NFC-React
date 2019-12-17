/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import useNFC from './src/utils/nfc';
import useUuid from './src/utils/uuid';
import {StyleSheet, Image} from 'react-native';
import store from './src/utils/store';
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
  return (
    <StoreProvider store={store}>
      <Container>
        <Header>
          <Image style={styles.image} source={require('./nwplus_logo.png')} />
          <Body>
            <Title>nwHacks NFC</Title>
          </Body>
        </Header>
        <Content style={styles.content}>
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
    </StoreProvider>
  );
};
