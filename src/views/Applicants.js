import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Right,
  Content,
  List,
  ListItem,
  Item,
  Input,
} from 'native-base';
import {useStoreState} from 'easy-peasy';
const ApplicantsScreen = props => {
  const [search, setSearch] = useState('');
  const hackers = useStoreState(state => state.hackers.items);
  const filteredHackers =
    search === ''
      ? hackers
      : hackers.filter(
          hacker =>
            (hacker.firstname &&
              hacker.firstname.toLowerCase().includes(search.toLowerCase())) ||
            (hacker.lastname &&
              hacker.lastname.toLowerCase().includes(search.toLowerCase())),
        );
  return (
    <Container>
      <Header style={{marginBottom: 0}}>
        <Left>
          <Button onPress={() => props.navigation.navigate('Home')} transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{width: 200}}>Hackers</Title>
        </Body>
        <Right />
      </Header>
      <Item style={{marginLeft: 20}}>
        <Icon name="ios-search" />
        <Input value={search} onChangeText={setSearch} placeholder="Search" />
      </Item>
      <Content>
        <List>
          {filteredHackers.map((hacker, i) => {
            return (
              <ListItem
                key={hacker.email}
                onPress={() => {
                  props.navigation.navigate('Attendee', {hacker: hacker.email});
                }}>
                <Text>
                  {!!hacker.firstname && hacker.firstname}{' '}
                  {!!hacker.lastname && hacker.lastname}
                </Text>
              </ListItem>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

export default ApplicantsScreen;
