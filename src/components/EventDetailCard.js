import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Button } from 'native-base';

const EventDetailCard = props => {

    const [people, setPeople] = useState([{name: "Jessica Wu", count: 1}, {name: "Marisa Chan", count: 2}]);

    useEffect(() => {
        // fetch people here
        const res = [{name: "Jessica Wu", count: 1}, {name: "Marisa Chan", count: 2}];
        setPeople(res);
    }) 

    return (
        <View style={styles.container}>
            <View style={[styles.headerBar, styles.inline]}>
                <Text style={[styles.text, styles.left]}>
                    {props.checkedIn?
                        "Checked-In"
                        :
                        "Not Checked-In"
                    }
                </Text>
                <Text style={[styles.text, styles.right]}>
                    Count: 3
                </Text>
            </View>
            <SafeAreaView style={styles.scrollContainer}>
                <ScrollView>
                    {props.checkedIn?
                        <View style={styles.buttonContainer}>
                            {/* need to add onPress with startScan here */}
                            <Button style={styles.button}>
                                <Text style={styles.text}>Scan</Text>
                            </Button>
                        </View>
                        :
                        <View></View>
                    }
                    {people.map(person => 
                        <View>
                            <View style={[styles.inline, styles.tableContent]}>
                                <Text style={styles.left}>{person.name}</Text>
                                <Text style={styles.right}>{person.count}</Text>
                            </View>
                            <View style={styles.divider}></View>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        width: '50%',
        justifyContent: 'center',
        backgroundColor: '#18CDCD',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        margin: 10,
        marginBottom: 0,
    },
    divider: {
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 1,
    },
    headerBar: {
        backgroundColor: '#2D2937',
    },
    inline: {
        display: 'flex',
        flex: 2,
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left: {
        textAlign: 'left',
    },
    right: {
        textAlign: 'right',
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderColor: '#EDEDED',
        borderWidth: 1,
    },
    tableContent: {
        marginHorizontal: 20,
    },
    text: {
        color: 'white',
        marginHorizontal: 10,
        paddingVertical: 5,
        fontSize: 16,
    }
});

export default EventDetailCard;