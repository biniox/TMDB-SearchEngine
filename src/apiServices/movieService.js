import axios from 'axios';
import * as API_CONFIG from './apiConfig.js';

const PATH = API_CONFIG.URL + "movie/";

const getByID = async (id, callback, retryCount = 3) => {
    const url = PATH + id + "?api_key=" + API_CONFIG.API_KEY + "&language=" + API_CONFIG.LANGUAGE;
    
    try {
        const response = await axios(url)
        callback(response.data);        
    } catch(err) {
        console.log("movieService error: retryCount - ", retryCount);
        console.log(err);
        // if error, app try to get data 3 times
        if(retryCount != 0) getByID(id, callback, retryCount - 1);
    }

}

const getByIDPromise = (id, retryCount = 3) => new Promise((resolve, reject) => {
        getByID(id, (ele) => resolve(ele), retryCount); 
    });



export { getByID, getByIDPromise }