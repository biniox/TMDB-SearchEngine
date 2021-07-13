import React from 'react'
import { ListItem, Avatar } from 'react-native-elements';
import { Pressable } from 'react-native';

import * as API_CONFIG from './../../apiServices/apiConfig.js';
import noPoster from './../../../assets/noPoster.png';

const MovieListItem = React.memo(({navigation, item}) => {

    return (
      <Pressable onPress={() => navigation.navigate('Movie', item)} >
        <ListItem key={item.id} bottomDivider>
          <Avatar 
            source={
                    item.poster_path!= null ? 
                    { uri: API_CONFIG.URL_IMAGE_LARGE + item.poster_path } 
                    : 
                    noPoster
                   }
          />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
            <ListItem.Subtitle>Popularność: {item.popularity}</ListItem.Subtitle>
            <ListItem.Subtitle>Ocena: {item.vote_average} ( {item.vote_count} głosów )</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Pressable>
      )
})

export default MovieListItem
