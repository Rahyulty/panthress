import axios from 'axios'
import { JSONResponse } from './types';
import { Deta, Base } from "deta";

export async function getWeatherAPI() {
  const params = {
    access_key: process.env.WEATHER,
    query: 'New York',
    units: 'f'
  }

  return (await axios.get('http://api.weatherstack.com/current', { params })).data as JSONResponse

}

export async function getDetaBase() {
  const deta = Deta(process.env.DATA)
  const dataBase = deta.Base('pnth-data')
  return dataBase
}