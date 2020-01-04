import React, {useEffect, useState} from 'react';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {View, Text, Button, Toast, Spinner} from 'native-base';
import {StyleSheet, Image} from 'react-native';

const Login = props => {
  const login = useStoreActions(actions => actions.auth.login);
  const isLoggedIn = useStoreState(state => state.auth.loggedIn);
  const mode = useStoreState(state => state.project.mode);
  const setMode = useStoreActions(actions => actions.project.setMode);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isLoggedIn) {
      props.navigation.navigate('Main');
    }
  }, [isLoggedIn, props.navigation]);

  const doLogin = async () => {
    setLoading(true);
    const res = mode === 'test' ? await login(true) : await login();
    if (!res) {
      setLoading(false);
      Toast.show({
        text:
          'You are not allowed to login here. If this is an error, please contact the dev team.',
        duration: 5000,
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../static/nwplus-logo.png')}
      />
      <Text style={styles.text}>nwPlus NFC</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={doLogin}
      />
      <View style={{height: 50}}>{loading ? <Spinner /> : null}</View>
      <View style={styles.modeView}>
        <Text style={{color: 'white', textAlign: 'center'}}>Mode</Text>
        <View style={styles.modeButtonView}>
          <Button
            onPress={() => setMode('live')}
            style={[
              styles.modeButtons,
              mode === 'live' ? {backgroundColor: 'green'} : {},
            ]}>
            <Text style={styles.modeButtonText}>Live</Text>
          </Button>
          <Button
            onPress={() => setMode('test')}
            style={[
              styles.modeButtons,
              mode === 'test' ? {backgroundColor: 'green'} : {},
            ]}>
            <Text style={styles.modeButtonText}>Test</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

Login.navigationOptions = {
  header: null,
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 75,
    height: 75,
    marginTop: -100,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginBottom: 100,
  },
  modeButtons: {
    marginHorizontal: 20,
    backgroundColor: 'grey',
    width: 150,
    justifyContent: 'center',
  },
  modeButtonText: {
    textAlign: 'center',
  },
  modeView: {
    position: 'absolute',
    bottom: 20,
  },
  modeButtonView: {
    flexDirection: 'row',
    marginTop: 20,
  },
});
