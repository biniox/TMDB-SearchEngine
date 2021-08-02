import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';

import MovieListItem from './../../components/MovieListItem/index.js';
import * as AsyncStoreService from './../../apiServices/asyncStoreService.js'
import COLORS from '../../colors.js';
import Loader from '../../components/Loader/index.js';


const NoObserve = ({ navigation }) => (
  <View style={styles.noObserve}>
    <Text style={styles.noObserveText}> Brak filmów na liście, dodaj jakiś.</Text>
    <Button
      title="Wyszukiwarka"
      buttonStyle={styles.noObserveButton}
      onPress={() => navigation.navigate("Search")}
    />
  </View>
)



const ObserveView = ( { navigation } ) => {

  const [ observeList, setObserveList ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const getObserveList = async () => {
    const tmp = await AsyncStoreService.getObserveMovieAllWithData();
    setObserveList(tmp);
    setIsLoading(false)
  }

  useEffect( () => {
    getObserveList()
  }, [])

  return (
    <View style={styles.container}>

      <Text style={styles.title}> Do Obejrzenia </Text>
      {
      isLoading ?
      <Loader />
      :
      observeList.length ?
      <FlatList
        data={observeList}
        renderItem={({item}) => <MovieListItem navigation={navigation} item={item} /> }
        keyExtractor={(item, i) => i.toString()}
        onEndReachedThreshold={0.5}
      /> 
      : 
      <NoObserve navigation={navigation} />
    
    
      }
      
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 15,
    fontWeight: "700"
  },
  noObserve: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noObserveText: {
    fontSize: 20,
    paddingBottom: 10
  },
  noObserveButton: {
    padding: 15
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

});


export default ObserveView;
