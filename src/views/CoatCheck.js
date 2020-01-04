import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {
  H3,
  Content,
  List,
  ListItem,
  Item,
  Icon,
  Input,
  Spinner,
} from 'native-base';
import MenuButton from '../components/MenuButton';
import {useStoreState} from 'easy-peasy';

const CoatCheckScreen = props => {
  const hackers = useStoreState(state => state.hackers.items);
  const [search, setSearch] = useState('');
  const [filteredHackers, setFiltered] = useState([]);
  useEffect(() => {
    setFiltered(
      search === ''
        ? hackers.filter(hacker => !!hacker.coatCheck)
        : hackers
            .filter(
              hacker =>
                (hacker.firstname &&
                  hacker.firstname
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                (hacker.lastname &&
                  hacker.lastname
                    .toLowerCase()
                    .includes(search.toLowerCase())) ||
                (hacker.email &&
                  hacker.email.toLowerCase().includes(search.toLowerCase())),
            )
            .filter(hacker => !!hacker.coatCheck),
    );
  }, [search, hackers]);
  return (
    <SafeAreaView style={styles.header}>
      <MenuButton navigation={props.navigation} />
      <View>
        <H3 style={styles.text}>Coat Check</H3>
      </View>
      <View style={{backgroundColor: 'white'}}>
        <Item
          style={{
            backgroundColor: 'white',
            width: '100%',
            marginLeft: 10,
          }}>
          <Icon name="ios-search" />
          <Input value={search} onChangeText={setSearch} placeholder="Search" />
        </Item>
      </View>
      <View
        style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          height: 40,
          flexWrap: 'wrap',
        }}>
        <Text style={styles.titleText}>Name</Text>
        <Text style={[styles.titleText, {textAlign: 'right'}]}>
          Coat check #
        </Text>
      </View>
      <Content style={{backgroundColor: 'white'}}>
        {hackers.length === 0 ? (
          <Spinner />
        ) : filteredHackers.length === 0 ? (
          <Text style={{textAlign: 'center', fontSize: 24, marginTop: 50}}>
            No one is assigned a number
          </Text>
        ) : (
          <List>
            {filteredHackers.map((hacker, i) => {
              return (
                <ListItem key={hacker.email}>
                  <Text style={{width: '90%'}}>
                    {!!hacker.firstname && hacker.firstname}{' '}
                    {!!hacker.lastname && hacker.lastname}
                  </Text>
                  <Text style={{textAlign: 'right'}}>
                    {hacker.coatCheck ? hacker.coatCheck : -1}
                  </Text>
                </ListItem>
              );
            })}
          </List>
        )}
      </Content>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  titleText: {
    padding: 10,
    fontSize: 18,
  },
  currentEvent: {
    color: '#18CDCD',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 5,
  },
  header: {
    backgroundColor: '#2D2937',
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginVertical: '6%',
  },
});

export default CoatCheckScreen;
