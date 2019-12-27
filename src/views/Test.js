import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'native-base';
import {useStoreState} from 'easy-peasy';
import {getUserFromUid} from '../utils/firebase';

const Test = props => {
  const hackers = useStoreState(state => state.hackers.items);

  const [user, setUser] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const uid = props.navigation.getParam('uid', '');
      await getUserFromUid(uid, setUser);
    };
    getUser();
  }, [props.navigation]);

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
