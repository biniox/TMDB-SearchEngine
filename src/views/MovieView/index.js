import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements/dist/image/Image';
import { Button } from 'react-native-elements';
import RatingCustom from '../../components/RatingCustom/index.js';

import { getFromArrayById } from '../../helpers.js';
import { globalContext } from '../../Store/globalStore.js';
import * as API_CONFIG from './../../apiServices/apiConfig.js';
import COLORS from '../../colors.js';

import noPoster from './../../../assets/noPoster.png';

import * as AsyncStoreService from './../../apiServices/asyncStoreService.js';

const ObserveButton = ({ id, navigation }) => {
  const [isObserved, setIsObserved] = useState(false);

  const getObservedStatus = async () => {
    const tmp = await AsyncStoreService.checkContainObserveMovie(id);
    setIsObserved(tmp);
  }



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getObservedStatus();
    });

    return unsubscribe;
  }, [navigation]);


  const handlerOnPress = async () => {

      if(isObserved)
        await AsyncStoreService.removeObserveMovie(id) 
      else
        await AsyncStoreService.addObserveMovie(id)
        getObservedStatus();
      
  }

  
  return ( <Button
    title={ isObserved ? "Usuń z Do obejrzenia" : "Do Obejrzenia" }
    buttonStyle={styles.obsButton}
    onPress={handlerOnPress}
  />)
}

const MovieView = ({ route, navigation } ) => {
  const { genres } = useContext(globalContext);

  const {
        id, 
        title, 
        poster_path, 
        overview, 
        vote_average, 
        genre_ids, 
        original_language, 
        release_date
      } = route.params;

  const mappGenre = () => genre_ids.map(item => getFromArrayById(genres, item).name).join(", ");
  const mappCompleteGenres = () => route.params.genres.map(item => item.name).join(", ");
  // two function is because tmdb give genres in two format, only id genre or id with name,
  // if we have movie we use mappCompleteGenres, if we have movie without name, we will use mappGenre


  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <View>
            <Image 
                source={poster_path!= null ? { uri: API_CONFIG.URL_IMAGE_LARGE + poster_path } : noPoster }
                style={styles.poster}
            />
          </View>
          
          <View style={styles.details}>
              <Text style={styles.title}>{title} ({release_date.slice(0,4)})</Text>
              <Text>Kraj produkcji: { original_language }</Text>
              <Text>{ route.params.genres ? mappCompleteGenres() : mappGenre() }</Text>
              <RatingCustom rate={vote_average} max={10} />

              <ObserveButton id={id} navigation={navigation} />

              
          </View>
      </View>

      <View style={styles.overview}>
          <Text style={styles.title}>Opis:</Text>
          <Text>{overview.length != "" ? overview : "Brak opisu"}</Text>
      </View>
      
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10
  },

  header: {
    flexDirection: 'row',
  },

  poster: {
    height: 225, 
    width: 150,
    marginRight: 10
  },

  title: {
      fontWeight: "bold"
  },

  overview: {
      marginTop: 10
  },

  details: {
    flexShrink: 1, 
    color: COLORS.grey
  },
  obsButton: {
    marginTop: 10
  }
});


export default MovieView;
