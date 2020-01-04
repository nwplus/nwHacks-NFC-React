import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import {Button, Spinner} from 'native-base';
import {useStoreState, useStoreActions} from 'easy-peasy';

const EventDetailCard = props => {
  const hackers = useStoreState(state => state.hackers.items);
  const setScanning = useStoreActions(actions => actions.events.setScanning);
  const [relevant, setRelevant] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRelevant = () => {
      if (props.checkedIn) {
        return hackers.filter(hacker => {
          try {
            return hacker.events[props.event].count > 0;
          } catch (e) {
            return false;
          }
        });
      } else {
        return hackers.filter(hacker => {
          try {
            const checked = hacker.events[props.event].count > 0;
            return !checked;
          } catch (e) {
            return true;
          }
        });
      }
    };
    setRelevant(getRelevant());
    setLoading(false);
  }, [hackers, props.checkedIn, props.event]);
  return (
    <View style={styles.container}>
      <View style={[styles.headerBar, styles.inline]}>
        <Text style={[styles.text, styles.left]}>
          {props.checkedIn ? 'Checked-In' : 'Not Checked-In'}
        </Text>
        <Text style={[styles.text, styles.right]}>
          Count: {relevant.length}
        </Text>
      </View>
      <SafeAreaView style={styles.scrollContainer}>
        <ScrollView>
          {props.checkedIn ? (
            <View style={styles.buttonContainer}>
              {/* need to add onPress with startScan here */}
              <Button
                onPress={() => {
                  setScanning(props.event);
                  setTimeout(() => props.navigation.navigate('Scan'), 500);
                }}
                style={styles.button}>
                <Text style={styles.text}>Scan</Text>
              </Button>
            </View>
          ) : (
            <View />
          )}
          {loading ? (
            <View>
              <Text style={{textAlign: 'center'}}>Loading Applicants</Text>
              <Spinner />
            </View>
          ) : (
            relevant.map((person, i) => (
              <View key={i}>
                <View style={[styles.inline, styles.tableContent]}>
                  <Text style={styles.left}>
                    {person.firstname} {person.lastname}
                  </Text>
                  <Text style={styles.right}>
                    {props.checkedIn ? person.events[props.event].count : 0}
                  </Text>
                </View>
                <View style={styles.divider} />
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

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
  },
});

export default EventDetailCard;
