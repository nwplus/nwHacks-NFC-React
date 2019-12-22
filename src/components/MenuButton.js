import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class MenuButton extends React.Component {
    render() {
        return (
            <Icon
                name="menu"
                size={30}
                // color="#900"
                onPress={() => this.props.navigation.toggleDrawer()}
                style={styles.menuIcon} />
        )
    }
}

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9,
        position: 'absolute',
        top: 40,
        left: 20
    }
})