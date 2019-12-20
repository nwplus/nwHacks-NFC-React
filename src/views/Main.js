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
import {StyleSheet, View, ImageBackground} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {Container, Content, Button, Text, H3, H1} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Scan from './Scan';

const styles = StyleSheet.create({
  headerImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    flex: 1,
  },
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
  menuBtn: {
    width: 145,
    height: 145,
    color: '#FFFFFF',
    borderRadius: 2,
    alignSelf: 'center'
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
      <ImageBackground style={styles.headerImage} source={require('../../assets/nwMenuHeader.png')}>
      <View>
        <H3 style={styles.text}>
          Home
        </H3>
        <Button onPress={() => navigateTo('Scan')}>
          <Text>Scan</Text>
        </Button>
          <Grid>
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
      </ImageBackground>
    </Container>
  );
};
Main.navigationOptions = {
  header: null,
//  headerTitle: 'nwHacks NFC',
};
export default Main;