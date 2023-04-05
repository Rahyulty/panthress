import axios from 'axios'
import { JSONResponse } from './types';

export async function getWeatherAPI() {
  const params = {
    access_key: process.env.WEATHER,
    query: 'New York',
    units: 'f'
  }

  return (await axios.get('http://api.weatherstack.com/current', { params })).data as JSONResponse

}