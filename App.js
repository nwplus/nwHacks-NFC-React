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
        <TouchableOpacity onPress={this._testNdef}>
          <Text>Test</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  _cleanUp() {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }

  async _testNdef() {
    try {
      await NfcManager.registerTagEvent();
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
    // try {
    //   let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
    //     alertMessage: 'Ready to write some NFC tags!',
    //   });
    //   console.warn(resp);
    //   let ndef = await NfcManager.getNdefMessage();
    //   console.warn(ndef);
    //   let bytes = Ndef.encodeMessage([Ndef.textRecord('sql injection')]);
    //   await NfcManager.writeNdefMessage(bytes);
    //   console.warn('successfully write ndef');
    //   await NfcManager.setAlertMessageIOS('I got your tag!');
    //   this._cleanUp();
    // } catch (ex) {
    //   console.warn('error', ex);
    //   this._cleanUp();
    // }
  }
}
