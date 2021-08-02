import React, { useEffect } from 'react'
import { Header as HeaderReactNativeElements } from 'react-native-elements'
;
import { useNavigation } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import COLORS from '../../colors';


const Header = (props) => {
    const navigator = useNavigation();


    const handlerRightOnPress = () => navigator.navigate('Observe');
    const handlerLeftOnPress = () => navigator.navigate('Search');

    return (
        <HeaderReactNativeElements
            centerComponent={{ text: 'Wyszukiwarka TMDB', style: styles.headerTitle  }}
            containerStyle={styles.header}
            leftComponent={{ icon: 'home', type: 'font-awesome', onPress: handlerLeftOnPress, iconStyle: styles.headerLeft }}
            rightComponent={{ icon: 'heart', type: 'font-awesome', onPress: handlerRightOnPress, iconStyle: styles.headerRight }}
        />
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: COLORS.purple,
      minHeight: 100,
      paddingRight: 20
    },
    headerTitle: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: 20,
    },
    headerRight: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: 30,
      paddingRight: 10
    },
    headerLeft: {
      color: COLORS.white,
      fontWeight: 'bold',
      fontSize: 30,
      paddingLeft: 10
    }
  });

export default Header
