import axios, { AxiosError, AxiosResponse } from "axios";
import pokeConstants from "../constants/poke.constants";

export const axiosGetCall = async (route:string, query: string, page = 1, body: any = null, token = null) => {
    let offset = 0;

    if (route === pokeConstants.POKEMON_BASE_URL) {
         if (page > 1) {
            offset = (page - 1) * 100;
        }
        route = `${route}/${query}?offset=${offset}&limit=${100}`;
    }

    const onSuccess = (response : AxiosResponse) => {
        return response.data;
    }

    const onError =  (error: AxiosError) => {
        console.error('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }



    return axios.get(route, {
        data: body
    }).then(onSuccess)
        .catch(onError);
}

export const axiosPostCall = async (route:string, query: string, body: any = null, token = null) => {

    let page = 1;
    let offset = 0;

    if (route === pokeConstants.POKEMON_BASE_URL) {
         if (page > 1) {
            offset = (page - 1) * 100;
        }
        route = `${route}/${query}?offset=${offset}&limit=${100}`;
    }

    const onSuccess = (response : AxiosResponse) => {
        return response.data;
    }

    const onError =  (error: AxiosError) => {
        console.error('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }



    return axios.post(route, {
        data: body
    }).then(onSuccess)
        .catch(onError);
}