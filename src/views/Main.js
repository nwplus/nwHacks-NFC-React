/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import {useStoreState} from 'easy-peasy';
import {Button, Text, H3, Icon} from 'native-base';
import {Col, Grid} from 'react-native-easy-grid';
import GreenButton from '../components/GreenButton';
import MenuButton from '../components/MenuButton';
import {SafeAreaView} from 'react-navigation';
import RegisterButton from '../utils/register';
const styles = StyleSheet.create({
  headerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    top: '-37%',
  },
  content: {
    margin: '10%',
  },
  button: {
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '70%',
    height: '70%',
    zIndex: -1,
    position: 'absolute',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginVertical: '6%',
  },
  menuBtn: {
    width: 145,
    height: 145,
    color: '#FFFFFF',
    borderRadius: 2,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginVertical: '10%',
    bottom: '-30%',
  },
  menuText: {
    bottom: 70,
    fontSize: 18,
    textTransform: 'capitalize',
    zIndex: 1,
  },
  menuImage: {
    width: '75%',
    height: '80%',
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -15,
    left: 15,
    zIndex: -1,
  },
  menuIcon: {
    fontSize: 120,
    position: 'absolute',
    bottom: -20,
    left: 0,
    zIndex: -1,
  },
});

const Main = props => {
  //Set navigation options:

  //Example of getting an item from easy-peasy store
  const isLoggedIn = useStoreState(state => state.auth.loggedIn);
  const navigateTo = screen => {
    props.navigation.navigate(screen);
  };
  if (!isLoggedIn) {
    props.navigation.navigate('Auth');
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <MenuButton navigation={props.navigation} />
      <Image
        style={styles.headerImage}
        source={require('../../assets/nwMenuHeader.png')}
      />
      <View>
        <H3 style={styles.text}>Home</H3>
        <GreenButton text="Scan" location="Scan" />
        <Grid style={styles.grid}>
          <Col>
            <Button
              light
              style={[{backgroundColor: 'lightblue'}, styles.menuBtn]}
              onPress={() => navigateTo('Meals')}>
              <Image
                style={styles.menuImage}
                source={require('../../assets/taco.png')}
              />
              <Text style={styles.menuText}>Meals</Text>
            </Button>
            <Button
              light
              style={[{backgroundColor: 'orange'}, styles.menuBtn]}
              onPress={() => navigateTo('Applicants')}>
              <Icon name="people" style={styles.menuIcon} />
              <Text style={styles.menuText}>Applicants</Text>
            </Button>
          </Col>
          <Col>
            <Button
              light
              style={[{backgroundColor: 'lightgreen'}, styles.menuBtn]}
              onPress={() => navigateTo('Workshops')}>
              <Icon style={styles.menuIcon} name="laptop" />
              <Text style={styles.menuText}>Workshops</Text>
            </Button>
            <Button
              light
              style={[{backgroundColor: 'pink'}, styles.menuBtn]}
              onPress={() => navigateTo('Coat Check')}>
              <Icon
                name="hanger"
                type="MaterialCommunityIcons"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Coat Check</Text>
            </Button>
          </Col>
        </Grid>
      </View>
      <RegisterButton />
    </SafeAreaView>
  );
};
Main.navigationOptions = {
  header: null,
};
export default Main;
