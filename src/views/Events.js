import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { H3 } from 'native-base';
import MenuButton from '../components/MenuButton';
import EventButton from '../components/EventButton';
import { getEvents } from '../utils/firebase';
import EventDetailCard from '../components/EventDetailCard';

const EventsScreen = props => {

    const [events, setEvents] = useState([{name: "Breakfast"}, {name: "Lunch"}, {name: "Dinner"}]);
    const [currentOpen, setCurrentOpen] = useState("");

    const fetchData = async () => {
        const res = await getEvents();
        setEvents(res);
    }

    useEffect(() => {
        setEvents([{name: "Breakfast"}, {name: "Lunch"}, {name: "Dinner"}]);
        setCurrentOpen("");
        // fetchData();
    })

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <MenuButton navigation={props.navigation} />
                    <H3 style={styles.text}>Events</H3>
                    <Text style={styles.currentEvent}>{currentOpen}</Text>
                </View>
                {currentOpen === ""?
                    <View>
                        {events.map((event, i) => 
                            <EventButton key={i} event={event} onPress={setCurrentOpen(event.name)}/>
                        )}
                    </View>   
                    :
                    <View>
                        <EventDetailCard checkedIn={true} />
                        <EventDetailCard checkedIn={false} />
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    currentEvent: {
        color: '#18CDCD',
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    header: {
        backgroundColor: '#2D2937',
    }, 
    text: {
        textAlign: 'center',
        color: 'white',
        marginVertical: '6%',
    },
});

export default EventsScreen;