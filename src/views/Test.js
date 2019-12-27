import React from 'react';
import {View, Text, Button} from 'native-base';
import {useStoreState} from 'easy-peasy';

const Test = props => {
  const hackers = useStoreState(state => state.hackers.items);

  return (
    <View>
      <Button onPress={() => props.navigation.navigate('Home')}>
        <Text>Take me home!</Text>
      </Button>
      <Text>UID: {props.navigation.getParam('uid', 'No UID!')}</Text>
    </View>
  );
};

Test.navigationOptions = {
  headerTitle: 'Test page',
};

export default Test;
