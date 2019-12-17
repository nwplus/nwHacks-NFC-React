import React from 'react';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {useStoreActions, useStoreState} from 'easy-peasy';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
const Login = props => {
  const login = useStoreActions(actions => actions.auth.login);
  const isLoggedIn = useStoreState(state => state.auth.loggedIn);
  if (isLoggedIn) {
    props.navigation.navigate('Main');
  }
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={login}
      />
    </View>
  );
};

Login.navigationOptions = {
  headerTitle: 'Login',
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
