/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import NfcManager, {NfcEvents, Ndef, NfcTech} from 'react-native-nfc-manager';
import {Container, Content, Button, Text, H1} from 'native-base';
import uuid from 'uuid';

const styles = StyleSheet.create({
  content: {
    margin: 20,
  },
  button: {
    marginVertical: 10,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      uuid: '',
    };
  }

  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.log('Read a tag with payload(s):');
      tag.ndefMessage.map(message => {
        const payload = Ndef.text.decodePayload(message.payload);
        console.log(payload);
        this.setState({text: `Payload: ${payload}`});
      });
      NfcManager.setAlertMessageIOS('I got your tag!');
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }

  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    this._cleanUp();
  }

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Text>This is an NFC app and I'm going SQL inject your NFC tag</Text>
          <Button style={styles.button} onPress={this._read}>
            <Text>Read</Text>
          </Button>
          <Button style={styles.button} onPress={this._write}>
            <Text>Write</Text>
          </Button>
          <Button style={styles.button} onPress={this._generateUUID}>
            <Text>Generate UUID: {this.state.uuid}</Text>
          </Button>
          <H1>{this.state.text}</H1>
        </Content>
      </Container>
    );
  }

  _generateUUID = () => {
    this.setState({uuid: uuid.v4()});
  };

  _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  _read = async () => {
    try {
      this.setState({text: 'Ready to read'});
      await NfcManager.registerTagEvent(tag => {
        NfcManager.unregisterTagEvent().catch(() => 0);
      });
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  _write = async () => {
    this.setState({text: 'Ready to write'});
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: 'Ready to write',
      });
      let bytes = Ndef.encodeMessage([
        Ndef.textRecord(`Heres my number ${this.state.uuid} so call me maybe`),
      ]);
      await NfcManager.writeNdefMessage(bytes);
      console.log('successfully write ndef');
      this.setState({text: `Successfully wrote uuid: ${this.state.uuid}`});
      await NfcManager.setAlertMessageIOS('Successfully write ndef');
    } catch (ex) {
      this.setState({text: 'wtf'});
      await NfcManager.invalidateSessionWithErrorIOS('error writing tag!');
      console.log('ex', ex);
    } finally {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    }
  };
}
