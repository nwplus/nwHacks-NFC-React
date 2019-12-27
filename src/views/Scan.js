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
import {Container, Content, Button, Text, H3, H1} from 'native-base';
import MenuButton from '../components/MenuButton';

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
  const redirect = () => {
    props.navigation.navigate('Test');
  };

  const [text, setText] = useState('');
  const [isScanning, setScanning] = useState(false);
  const {getNFC, _read} = useNFC(setScanning, setText, redirect);

  useEffect(() => {
    _read();
  }, []);

  return (
    <Container style={styles.wrapper}>
      <MenuButton navigation={props.navigation} />
      <Content contentContainerStyle={styles.content}>
        <Content style={styles.header}>
          <H3 style={styles.text}>NFC Tag Scanner</H3>
          <Text style={styles.text}>
            {getNFC ? 'NFC Enabled!' : 'NFC not supported.'}
          </Text>
        </Content>
        <Content contentContainerStyle={styles.body}>
          {/* <H1 style={styles.text}>{text}</H1> */}
          {isScanning ? (
            <Text style={styles.text}>Scanning...</Text>
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
