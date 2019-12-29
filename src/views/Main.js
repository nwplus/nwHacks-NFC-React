/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Content, Button, Text, H3, H1, View} from 'native-base';
import MenuButton from '../components/MenuButton';
import {SafeAreaView} from 'react-navigation';

const styles = StyleSheet.create({
  content: {
    margin: 20,
  },
  button: {
    marginVertical: 10,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 30,
    height: 30,
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },
});

const Main = props => {
  //Set navigation options:

  //Example of getting an item from easy-peasy store
  const isLoggedIn = useStoreState(state => state.auth.loggedIn);

  //Example of getting actions or thunks from easy-peasy store
  const initialise = useStoreActions(actions => actions.initialise);
  const logout = useStoreActions(actions => actions.auth.logout);
  //initialize store
  useEffect(() => {
    initialise();
  }, [initialise]);
  if (!isLoggedIn) {
    props.navigation.navigate('Auth');
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar hidden={true} />
      <MenuButton navigation={props.navigation} />

      <View style={{flex: 1}}>
        <Content style={styles.content}>
          <H3 style={styles.text}>
            This is an NFC app and I'm going SQL inject your NFC tag
          </H3>
          <Button onPress={logout}>
            <Text>logout!</Text>
          </Button>
        </Content>
      </View>
    </SafeAreaView>
  );
};

Main.navigationOptions = {
  headerTitle: 'nwHacks NFC',
};

export default Main;
