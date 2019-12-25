import React from 'react';
import {
    Text,
    Platform,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { View } from 'native-base';
import { useStoreActions } from 'easy-peasy';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
// const logout = useStoreActions(actions => actions.auth.logout);

export default class MenuDrawer extends React.Component {

    navLink(nav, text) {
        return (
            <TouchableOpacity style={{ height: 80 }} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topImage}>

                </View>
                <View >
                    {this.navLink("Home", "Home")}
                    {this.navLink("Events", "Events")}
                    {this.navLink("Workshops", "Workshops")}
                    {this.navLink("Applicants", "Applicants")}
                    {this.navLink("Coat Check", "Coat Check")}
                    {/* {this.navLink("Scan", "Scan")} */}
                    <TouchableOpacity style={{ height: 80 }} onPress={() => this.props.navigation.navigate("Scan")}>
                        <Text style={styles.linkScan}>Scan</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ height: 80 }} onPress={logout}>
                        <Text style={styles.linkScan}>Logout</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2937',
    },
    menuItem: {

    },
    topImage: {
        height: 160,
        backgroundColor: 'black'

    },
    link: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 450,
    },
    linkScan: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'center',
        color: '#0DEFE1',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 450,
    }
})