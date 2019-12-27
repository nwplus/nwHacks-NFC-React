import {useEffect} from 'react';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {useStoreActions, useStoreState} from 'easy-peasy';

export default setText => {
  const setNFC = useStoreActions(actions => actions.nfc.setNFC);
  const getNFC = useStoreState(state => state.nfc.on);
  useEffect(() => {
    NfcManager.start()
      .then(() => {
        setNFC(true);
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
          console.log('Read a tag with id:', tag.id);
          setText(tag.id);
          NfcManager.setAlertMessageIOS('I got your tag!');
          NfcManager.unregisterTagEvent().catch(() => 0);
        });
      })
      .catch(e => {
        setNFC(false);
        console.warn(
          'This device does not support NFC. NFC cabilities will not work.',
        );
      });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      _cleanUp();
    };
  }, [setNFC, setText]);

  const _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  const _read = async () => {
    try {
      setText('Scanning...');
      await NfcManager.registerTagEvent(tag => {
        NfcManager.unregisterTagEvent().catch(() => 0);
      });
    } catch (ex) {
      console.warn('ex', ex);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  return {
    _read,
    getNFC,
  };
};
