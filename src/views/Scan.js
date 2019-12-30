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
import {Container, Spinner, Content, Button, Text, H3, Icon} from 'native-base';
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
  const [isScanning, setScanning] = useState(false);
  const {_read, nfc} = useNFC(setScanning);

  const startScan = async () => {
    const uid = await _read();
    if (uid == null) {
      return;
    }
    props.navigation.navigate('Attendee', {uid});
  };

  useEffect(() => {
    startScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={styles.wrapper}>
      <MenuButton navigation={props.navigation} />
      <Content contentContainerStyle={styles.content}>
        <Content style={styles.header}>
          <H3 style={styles.text}>NFC Tag Scanner</H3>
          <Text style={styles.text}>
            {nfc ? 'NFC Enabled!' : 'NFC not supported.'}
          </Text>
          <Icon
            name="nfc"
            type="MaterialCommunityIcons"
            style={{
              marginTop: 100,
              fontSize: 200,
              color: 'white',
            }}
          />
        </Content>
        <Content contentContainerStyle={styles.body}>
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
        </Content>
      </Content>
    </Container>
  );
};

Scan.navigationOptions = {
  header: null,
};

export default Scan;
