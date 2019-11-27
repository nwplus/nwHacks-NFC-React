/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

export default class App extends React.Component {
  componentDidMount() {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      console.log('tag', tag);
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
      <SafeAreaView>
        <Text>This is an NFC app and I'm going SQL inject your NFC tag</Text>
        <TouchableOpacity onPress={this._read}>
          <Text>Test</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
