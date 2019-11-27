/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import NfcManager, {NfcEvents, Ndef} from 'react-native-nfc-manager';
import {Container, Content, Button, Text} from 'native-base';

export default class App extends React.Component {
  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.log('Read a tag with payload(s):');
      tag.ndefMessage.map(message =>
        console.log(Ndef.text.decodePayload(message.payload)),
      );
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
        <Content>
          <Text>This is an NFC app and I'm going SQL inject your NFC tag</Text>
          <Button onPress={this._read}>
            <Text>Test</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  _cleanUp() {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }

  async _read() {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  }
}
