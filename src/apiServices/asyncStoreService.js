import { AsyncStorage } from 'react-native';
// I used this module because I am using expo. Expo is not support AsyncStorage from community
import Storage from 'react-native-storage';

import * as MovieService from './movieService.js';


const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null
});

const OBSERVE_KEY = "observed";

const clearObserveMovieAll = async () => {

        await storage.save({
            key: OBSERVE_KEY, 
            data: [ ],
            expires: null
        });

      
    
}

const addObserveMovie = async (id) => {
    const prev = await getObserveMovieAll();

    if(prev.indexOf(id) === -1 )
        await storage.save({
            key: OBSERVE_KEY, 
            data: [ ...prev, id ],
            expires: null
        });

    // clearObserveMovieAll();  
    
}

const getObserveMovieAll = async () => {
    let result;

    try {
        result = await storage.load({
            key: OBSERVE_KEY, 
        });
    } catch(err) {
        result = [];
    }

    return result;
}

const getObserveMovieAllWithData = async () => {

    let list = await getObserveMovieAll();
    const mappedList = [];

    for(let i = 0; i<list.length; i++ ) {
        const tmp = await MovieService.getByIDPromise(list[i]); 
        mappedList.push(tmp);   
        
    }

    return mappedList;
}


const removeObserveMovie = async (id) => {
    const list = await getObserveMovieAll();

    const removed = list.filter(item => item != id);

    await storage.save({
        key: OBSERVE_KEY, 
        data: removed,
        expires: null 
    });
}


const checkContainObserveMovie = async (id) => {
    const list = await getObserveMovieAll();
    return (list.indexOf(id) != -1 ) ? true : false;
}


export { 
    removeObserveMovie, 
    addObserveMovie, 
    getObserveMovieAll,
    getObserveMovieAllWithData,
    checkContainObserveMovie
};