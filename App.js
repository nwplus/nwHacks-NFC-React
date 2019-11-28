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

const styles = StyleSheet.create({
  content: {
    margin: 20,
  },
  button: {
    margin: 10,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
          <H1>{this.state.text}</H1>
        </Content>
      </Container>
    );
  }

  _cleanUp() {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }

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
        Ndef.textRecord(
          'Hey I just met you and this is crazy but heres my number (REDACTED) so call me maybe',
        ),
      ]);
      await NfcManager.writeNdefMessage(bytes);
      console.log('successfully write ndef');
      this.setState({text: 'Successful write'});
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
