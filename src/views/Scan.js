import React from 'react';
import {Container, Button, Text} from 'native-base';

const Scan = props => {
  //Set navigation options:
  return (
    <Container>
        <Button onPress={() => props.navigation.navigate('Home')}>
          <Text>Home</Text>
        </Button>
    </Container>
  );
};

Scan.navigationOptions = {
  header: null,
};

export default Scan;