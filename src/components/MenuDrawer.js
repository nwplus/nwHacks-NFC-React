import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { View } from 'native-base';
import { useStoreActions } from 'easy-peasy';
import Icon from 'react-native-vector-icons/AntDesign';

const MenuDrawer = props => {
    const logout = useStoreActions(actions => actions.auth.logout);
    function navLink(nav, text) {
        return (
            <TouchableOpacity style={{ height: 80 }} onPress={() => props.navigation.navigate(nav)}>
                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    };

    return (
        <View style={styles.container}>
            <Icon
                name="close"
                size={35}
                onPress={() => props.navigation.toggleDrawer()}
                style={styles.closeIcon} />
            <View style={styles.imgView} >
                <Image style={styles.img} source={require('../../nwplus_logo.png')} />
            </View>
            <View >
                {navLink("Home", "Home")}
                {navLink("Events", "Events")}
                {navLink("Workshops", "Workshops")}
                {navLink("Applicants", "Applicants")}
                {navLink("Coat Check", "Coat Check")}
                <TouchableOpacity style={{ height: 80 }} onPress={() => props.navigation.navigate("Scan")}>
                    <Text style={styles.linkScan}>Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 80 }} onPress={logout}>
                    <Text style={styles.linkLogout}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343338',
    },
    closeIcon: {
        color: 'white',
        textAlign: 'right',
        paddingTop: 50,
        paddingRight: 20

    },
    imgView: {
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: 40
    },
    img: {
        // padding: 50,
        height: 60,
        width: 60,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    link: {
        flex: 1,
        fontSize: 25,
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
        fontSize: 25,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'center',
        color: '#0DEFE1',
        fontWeight: 'bold',
        paddingTop: 10,
        paddingBottom: 450,
    },
    linkLogout: {
        flex: 1,
        fontSize: 25,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: 'center',
        opacity: 0.5,
        color: 'white',
        fontWeight: 'bold',
        paddingTop: 40,
        paddingBottom: 450,
    }
})

export default MenuDrawer;