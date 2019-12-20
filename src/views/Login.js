import React from 'react';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {View, Text} from 'native-base';
import {StyleSheet, Image} from 'react-native';

const Login = props => {
  const login = useStoreActions(actions => actions.auth.login);
  const isLoggedIn = useStoreState(state => state.auth.loggedIn);

  if (isLoggedIn) {
    props.navigation.navigate('Main');
  }

  return (
    <View style={styles.container}>
        <Image
            style={styles.image}
            source={require('../static/nwplus-logo.png')}
        />
        <Text style={styles.text}>nwPlus NFC</Text>
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={login}
        />
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
    marginBottom: 20
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginBottom: 100
  }
});
