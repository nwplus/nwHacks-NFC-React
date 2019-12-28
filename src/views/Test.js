import React from 'react';
import {View, Text, Button} from 'native-base';
import {useStoreState} from 'easy-peasy';

const Test = props => {
  const hackers = useStoreState(state => state.hackers.items);

  const user = props.navigation.getParam('user', '');

  return (
    <View>
      <Button onPress={() => props.navigation.navigate('Home')}>
        <Text>Take me home!</Text>
      </Button>
      <Text>User: {user ? user.email : 'none'}</Text>
    </View>
  );
};

Test.navigationOptions = {
  headerTitle: 'Test page',
};

export default Test;
