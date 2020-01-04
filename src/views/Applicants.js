import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
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
  Spinner,
} from 'native-base';
import {useStoreState, useStoreActions} from 'easy-peasy';
const ApplicantsScreen = props => {
  const [search, setSearch] = useState('');
  const hackers = useStoreState(state => state.hackers.items);
  const setScanMode = useStoreActions(actions => actions.scan.setScanMode);
  const filteredHackers =
    search === ''
      ? hackers
      : hackers.filter(
          hacker =>
            (hacker.firstname &&
              hacker.firstname.toLowerCase().includes(search.toLowerCase())) ||
            (hacker.lastname &&
              hacker.lastname.toLowerCase().includes(search.toLowerCase())) ||
            (hacker.firstname &&
              hacker.lastname &&
              `${hacker.firstname} ${hacker.lastname}`
                .toLowerCase()
                .includes(search.toLowerCase())) ||
            (hacker.email &&
              hacker.email.toLowerCase().includes(search.toLowerCase())),
        );
  return (
    <Container>
      <Header style={{marginBottom: 0, backgroundColor: '#2D2937'}}>
        <Left>
          <Button onPress={() => props.navigation.navigate('Home')} transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{width: 200, color: 'white'}}>Hackers</Title>
        </Body>
        <Right />
      </Header>
      <Item style={{marginLeft: 20}}>
        <Icon name="ios-search" />
        <Input value={search} onChangeText={setSearch} placeholder="Search" />
      </Item>
      <Content>
        {hackers.length === 0 ? (
          <View>
            <Text style={{textAlign: 'center', fontSize: 24, marginTop: 50}}>
              Loading Applicants...
            </Text>
            <Spinner />
          </View>
        ) : (
          <List>
            {filteredHackers.map((hacker, i) => {
              return (
                <ListItem
                  key={hacker.email}
                  onPress={() => {
                    setScanMode({mode: 'hacker', payload: hacker.email});
                    props.navigation.navigate('Attendee', {
                      hacker: hacker.email,
                    });
                  }}>
                  <Text>
                    {!!hacker.firstname && hacker.firstname}{' '}
                    {!!hacker.lastname && hacker.lastname}
                  </Text>
                </ListItem>
              );
            })}
          </List>
        )}
      </Content>
    </Container>
  );
};

export default ApplicantsScreen;
