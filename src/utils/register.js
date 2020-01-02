import React from 'react';
import {Button, Text, Toast} from 'native-base';
import {StyleSheet} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import DeviceInfo from 'react-native-device-info';
import {newDevice, deviceExists} from './firebase';
import {View} from 'react-native';
const styles = StyleSheet.create({
  registerView: {
    position: 'absolute',
    bottom: '6%',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    width: '100%',
  },
});

export default props => {
  const isOn = useStoreState(state => state.registered.on);
  const setOn = useStoreActions(actions => actions.registered.setOn);
  const register = useStoreActions(actions => actions.registered.register);

  const deviceID = DeviceInfo.getUniqueId();
  const manufacturer = DeviceInfo.getManufacturerSync();
  const model = DeviceInfo.getModel();
  const email = useStoreState(state => state.auth.email);
  const registerDevice = async () => {
    const exists = await deviceExists(deviceID);
    if (exists) {
      register(deviceID);
    } else {
      await newDevice(deviceID, {
        email,
        manufacturer,
        model,
        writeApplicantType: 'hacker',
        writeId: null,
        writeName: null,
      });
      register(deviceID);
    }
    Toast.show({
      text: 'Successfully Registered this device!',
      duration: 3000,
      type: 'success',
    });
  };

  return (
    <View style={styles.registerView}>
      {isOn ? (
        <Button style={styles.button} onPress={() => setOn(false)} danger>
          <Text>Stop scanning</Text>
        </Button>
      ) : (
        <Button style={styles.button} onPress={() => registerDevice()}>
          <Text>Register Device</Text>
        </Button>
      )}
    </View>
  );
};
