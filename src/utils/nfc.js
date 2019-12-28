import {useEffect, useState} from 'react';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';

export default (setScanning, onComplete) => {
  const [nfc, setNFC] = useState(false);
  useEffect(() => {
    NfcManager.start()
      .then(() => {
        setNFC(true);
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
          console.log('Read a tag with id:', tag.id);
          NfcManager.setAlertMessageIOS('Scan complete');
          NfcManager.unregisterTagEvent().catch(() => 0);
          setScanning(false);
          onComplete(tag.id);
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
  }, [setNFC, setScanning, onComplete]);

  const _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  };

  const _read = async () => {
    try {
      setScanning(true);
      await NfcManager.registerTagEvent(() => {
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
