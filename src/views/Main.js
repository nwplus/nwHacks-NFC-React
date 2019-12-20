/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import useNFC from '../utils/nfc';
import useUuid from '../utils/uuid';
import {StyleSheet, View, Image} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Container, Content, Button, Text, H3, H1} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Scan from './Scan';

const styles = StyleSheet.create({
  headerImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
    top: 0,
  },
  content: {
    margin: '10%',
  },
  button: {
    marginVertical: 10,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  menuBtn: {
    width: 145,
    height: 145,
    color: '#FFFFFF',
    borderRadius: 2,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginVertical: '10%',
  }
});

const Main = props => {
  //Set navigation options:

  const [text, setText] = useState('');
  const [currUuid, _generateUUID] = useUuid();
  const {_read, _write} = useNFC(currUuid, setText);

  //Example of getting an item from easy-peasy store
  const isLoggedIn = useStoreState(state => state.auth.loggedIn);

  //Example of getting actions or thunks from easy-peasy store
  const initialise = useStoreActions(actions => actions.initialise);
  const logout = useStoreActions(actions => actions.auth.logout);
  //initialize store
  const navigateTo = screen => {
    props.navigation.navigate(screen);
  }
  useEffect(() => {
    initialise();
  }, [initialise]);
  if (!isLoggedIn) {
    props.navigation.navigate('Auth');
  }
  return (
    <Container>
      <Image style={styles.headerImage} source={require('../../assets/nwMenuHeader.png')}/>
      <View>
        <H3 style={styles.text}>
          Home
        </H3>
        <Button block onPress={() => navigateTo('Scan')}>
          <Text>Scan</Text>
        </Button>
          <Grid style={styles.grid}>
            <Col>
              <Button light style={styles.menuBtn} onPress={() => navigateTo('Test')}>
                <Text>Test</Text>
              </Button>
              <Button light style={styles.menuBtn} onPress={() => navigateTo('Test')}>
                <Text>Test</Text>
              </Button>
            </Col>
            <Col>
              <Button light style={styles.menuBtn} onPress={() => navigateTo('Test')}>
                <Text>Test</Text>
              </Button>
              <Button light style={styles.menuBtn} onPress={() => navigateTo('Test')}>
                <Text>Test</Text>
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