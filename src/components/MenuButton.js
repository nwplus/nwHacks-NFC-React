import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const MenuButton = props => {
  const light = props.light ? styles.light : null;
  return (
    <Icon
      name="menu"
      size={30}
      onPress={() => props.navigation.toggleDrawer()}
      style={[styles.menuIcon, light]}
    />
  );
};

const styles = StyleSheet.create({
    menuIcon: {
        color: '#ffffff',
        zIndex: 9,
        position: 'absolute',
        top: 20,
        left: 20
    }
})

export default MenuButton;
