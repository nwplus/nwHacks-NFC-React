import {useEffect, useState} from 'react';
import NfcManager, {NfcTech, NfcEvents} from 'react-native-nfc-manager';
import {Platform} from 'react-native';

export default setScanning => {
  const [nfc, setNFC] = useState(false);
  useEffect(() => {
    NfcManager.start()
      .then(() => {
        setNFC(true);
        NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
          setScanning(false);
        });
      })
      .catch(e => {
        setNFC(false);
        console.warn(
          'This device does not support NFC. NFC cabilities will not work.',
        );
      });

    return () => {
      _cleanUp();
    };
  }, [setNFC, setScanning]);

  const _cleanUp = () => {
    NfcManager.cancelTechnologyRequest().catch(x =>
      console.warn("can't cancel" + x),
    );
  };

  const _read = async () => {
    setScanning(true);
    try {
      const tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      await NfcManager.requestTechnology(tech, {
        alertMessage: 'Ready to scan!',
      });
      const tag = await NfcManager.getTag();
      await NfcManager.setAlertMessageIOS('Scan complete!');
      setScanning(false);
      _cleanUp();
      return tag.id;
    } catch (ex) {
      await NfcManager.invalidateSessionWithErrorIOS(
        'An error occured while scanning. Please try again.',
      );
      console.warn('ex' + ex);
    }
    _cleanUp();
    setScanning(false);
    return null;
  };

  return {
    _read,
    nfc,
  };
};
