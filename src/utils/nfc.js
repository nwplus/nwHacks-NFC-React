import {useEffect} from 'react';
import NfcManager, {NfcEvents, Ndef, NfcTech} from 'react-native-nfc-manager';

export default (currUuid, setText) => {
  useEffect(() => {
    NfcManager.start()
      .then(() => {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
          console.log('Read a tag with payload(s):');
          tag.ndefMessage.map(message => {
            const payload = Ndef.text.decodePayload(message.payload);
            console.log(payload);
            setText(`Payload: ${payload}`);
          });
          NfcManager.setAlertMessageIOS('I got your tag!');
          NfcManager.unregisterTagEvent().catch(() => 0);
        });
      })
      .catch(e => alert("this device doesn't support nfc!"));

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      _cleanUp();
    };
  }, [setText]);

  const _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  const _read = async () => {
    try {
      setText('Ready to read');
      await NfcManager.registerTagEvent(tag => {
        NfcManager.unregisterTagEvent().catch(() => 0);
      });
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  const _write = async () => {
    if (currUuid === '') {
      setText('Please generate a uuid');
      return;
    }
    setText(`Ready to write ${currUuid}`);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef, {
        alertMessage: `Ready to write ${currUuid}`,
      });
      let bytes = Ndef.encodeMessage([
        Ndef.textRecord(`Heres my number ${currUuid} so call me maybe`),
      ]);
      await NfcManager.writeNdefMessage(bytes);
      console.log('successfully write ndef');
      setText(`Successfully wrote uuid: ${currUuid}`);
      await NfcManager.setAlertMessageIOS('Successfully write ndef');
    } catch (ex) {
      setText('wtf');
      await NfcManager.invalidateSessionWithErrorIOS('error writing tag!');
      console.log('ex', ex);
    } finally {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    }
  };
  return {
    _read,
    _write,
  };
};
