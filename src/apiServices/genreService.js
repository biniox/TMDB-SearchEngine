import axios from 'axios';
import * as API_CONFIG from './apiConfig.js';

const PATH = API_CONFIG.URL + "genre/movie/list";

const getGenre = async (callback, retryCount = 3) => {
    const url = PATH + "?api_key=" + API_CONFIG.API_KEY + "&language=" + API_CONFIG.LANGUAGE;

    try {
        const response = await axios(url)
        callback(response.data.genres);        
    } catch(err) {
        console.log("genreService error: retryCount - ", retryCount);
        console.log(err);
        // if error, app try to get data 3 times
        if(retryCount != 0) searchByName(name, callback, page, retryCount - 1);
    }

}


export { getGenre }