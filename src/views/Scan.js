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
    <Container>
      <MenuButton navigation={props.navigation} />
      <Content style={styles.content}>
        <H3 style={styles.text}>NFC Tag Scanner</H3>
        {getNFC ? null : (
          <Text style={styles.text}>
            {getNFC ? 'NFC Enabled!' : 'NFC not supported.'}
          </Text>
        )}
        <H1 style={styles.text}>{text}</H1>
        {isScanning ? (
          <Text>Scanning...</Text>
        ) : (
          <Button onPress={() => _read()}>
            <Text>Scan</Text>
          </Button>
        )}
      </Content>
    </Container>
  );
};

Scan.navigationOptions = {
  header: null,
};

export default Scan;
