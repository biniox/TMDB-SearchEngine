import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Rating } from 'react-native-elements';
import COLORS from '../../colors';



const RatingCustom = ( { rate, max } ) => {
    console.log(rate*5/max)
  return (
    <View>
      <Text style={styles.ratingTitle}>{rate}</Text>
      <Rating imageSize={25} readonly startingValue={rate*5/max} />  
    </View>

  );
}

const styles = StyleSheet.create({
  ratingTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: COLORS.grey,
    width: 48,
    height: 48,
    textAlign: 'center',
    lineHeight: 48,
    marginLeft: "50%",
    marginBottom: 10,
    marginTop: 10,
    transform: [{ translateX: -24}],

  }
});


export default RatingCustom;
