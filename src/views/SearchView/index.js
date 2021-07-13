import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';

import * as SearchService from './../../apiServices/searchService.js'
import Loader from './../../components/Loader/index.js';
import MovieListItem from './../../components/MovieListItem/index.js';

import logo from './../../../assets/logo.png';
import COLORS from '../../colors.js';

const SearchView = ( { navigation } ) => {

  const [ searchInput, setSearchInput ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ resultList, setResultList ] = useState([]);

  const showLogo = () => (
        searchInput.length<3 ? 
          <View style={styles.content}>
            <Image source={logo} />
          </View> 
          : 
          <Text></Text>
        );

  const showLoader = () => (
      searchInput.length>2 && isLoading ? 
      <View style={styles.content}>
        <Loader style={styles.loader} />
      </View> 
      : 
      <Text></Text>
    );

  const nextPage = () => {
    setIsLoading(true);
    setPage(prev => prev+1);   
  }

  useEffect(() => {
    if(searchInput.length>2) {
      setPage(1);
      setIsLoading(true);
      setResultList([])
      SearchService.searchByName(searchInput, (e) => {
        setIsLoading(false);
        setResultList(e);
      })
    } else {
      setResultList([])
    }
  }, [searchInput]);

  useEffect(() => {
    if(page!=1) 
      SearchService.searchByName(searchInput, (e) => {
        setIsLoading(false);
        setResultList(prev => prev.concat(e));
      }, page) 
      
  }, [page])

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Wpisz szukaną frazę..."
        onChangeText={e => setSearchInput(e)}
        value={searchInput}
        platform={Platform.OS}
        cancelButtonTitle="Anuluj"
      />
      { showLogo() }

      <FlatList
        data={resultList}
        renderItem={({item}) => <MovieListItem navigation={navigation} item={item} /> }
        keyExtractor={(item, i) => i.toString()}
        onEndReached={() => nextPage()}
        onEndReachedThreshold={0.5}
      />
      { showLoader() }
      
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },

  content: {
    alignItems: 'center',
    marginTop: 10
  },
  
  loader: {
    bottom: 40
  }
});


export default SearchView;
