import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Dimensions, Platform} from 'react-native';

const MenuButton = props => {
  const dim = Dimensions.get('window');
  const menuTop =
    Platform.OS === 'ios' && dim.height >= 812 ? {top: 65} : {top: 20};
  return (
    <Icon
      name="menu"
      size={30}
      onPress={() => props.navigation.toggleDrawer()}
      style={[styles.menuIcon, menuTop]}
    />
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    color: '#ffffff',
    zIndex: 9,
    position: 'absolute',
    top: 30,
    left: 20,
  },
});

export default MenuButton;
