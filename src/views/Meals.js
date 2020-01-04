import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import {H3, Icon, Button, Spinner} from 'native-base';
import MenuButton from '../components/MenuButton';
import EventButton from '../components/EventButton';
import EventDetailCard from '../components/EventDetailCard';
import {useStoreState} from 'easy-peasy';

const EventsScreen = props => {
  const events = useStoreState(state => state.events.meals);
  const [currentOpen, setCurrentOpen] = useState('');
  console.log(events.length);
  return (
    <SafeAreaView style={styles.header}>
      <MenuButton navigation={props.navigation} />
      <View>
        <H3 style={styles.text}>Meals</H3>
        {currentOpen !== '' ? (
          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <Button
                onPress={() => setCurrentOpen('')}
                style={{backgroundColor: '#2D2937'}}>
                <Icon name="arrow-back" style={{color: 'white'}} />
              </Button>
            </View>
            <View style={{flex: 6, alignItems: 'center'}}>
              <Text style={styles.currentEvent}>{currentOpen}</Text>
            </View>
            <View style={{flex: 1}} />
          </View>
        ) : null}
      </View>
      <ScrollView style={styles.container}>
        {currentOpen === '' ? (
          <View>
            {events.length === 0 ? (
              <View>
                <Text
                  style={{textAlign: 'center', fontSize: 24, marginTop: 50}}>
                  Loading events...
                </Text>
                <Spinner />
              </View>
            ) : (
              events.map((event, i) => (
                <EventButton
                  key={i}
                  event={event}
                  pressed={() => {
                    setCurrentOpen(event.name);
                  }}
                />
              ))
            )}
          </View>
        ) : (
          <View>
            <EventDetailCard
              navigation={props.navigation}
              event={currentOpen}
              checkedIn={true}
            />
            <EventDetailCard
              navigation={props.navigation}
              event={currentOpen}
              checkedIn={false}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
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

export default EventsScreen;
