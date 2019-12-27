/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, View, Image, TouchableHighlight} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Container, Content, Button, Text, H3} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Scan from './Scan';
import GreenButton from './GreenButton';

const styles = StyleSheet.create({
  headerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    top: '-36%',
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
    marginVertical: '7%',
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
    <Container>
      <Image
        style={styles.headerImage}
        source={require('../../assets/nwMenuHeader.png')}
      />
      <View>
        <H3 style={styles.text}>Home</H3>
        <GreenButton text='Scan' location='Scan'/>
        <Grid style={styles.grid}>
          <Col>
            <Button
              light
              style={styles.menuBtn}
              onPress={() => navigateTo('Test')}>
              <Text style={styles.menuText}>Events</Text>
            </Button>
            <Button
              light
              style={styles.menuBtn}
              onPress={() => navigateTo('Test')}>
              <Text style={styles.menuText}>Applicants</Text>
            </Button>
          </Col>
          <Col>
            <Button
              light
              style={styles.menuBtn}
              onPress={() => navigateTo('Test')}>
              <Text style={styles.menuText}>Workshop</Text>
            </Button>
            <Button
              light
              style={styles.menuBtn}
              onPress={() => navigateTo('Test')}>
              <Text style={styles.menuText}>Coat Check</Text>
            </Button>
          </Col>
        </Grid>
      </View>
    </Container>
  );
};
Main.navigationOptions = {
  header: null,
};
export default Main;
