import axios from "axios";
import { API_KEY } from "../constants";

const forecastEndpoint = params => `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=id:${params.id}&days=1&aqi=yes&alerts=no`
const locationsEndpoint = params => `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${params.city}`

const apiCall = async (endpoint) => {
    const options = {
        method: 'GET',
        url: endpoint
    }

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(err){
        console.log('error:', err);
        return null;
    }
}

export const fetchWeatherForecast = params => {
    let forecastUrl = forecastEndpoint(params);
    return apiCall(forecastUrl);
}

export const fetchLocations = params => {
    console.log(params);
    let locationsUrl = locationsEndpoint(params);
    return apiCall(locationsUrl);
}