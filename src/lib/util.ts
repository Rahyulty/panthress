import axios from 'axios'
import { JSONResponse } from './types';
import { Deta } from "deta";

export async function getWeatherAPI() {
  const params = {
    access_key: process.env.WEATHER,
    query: 'New York',
    units: 'f'
  }

  return (await axios.get('http://api.weatherstack.com/current', { params })).data as JSONResponse

}

// export async function getNewsAPI() {
//   const apikey = 'e2601b9b29158a4e8c566c3f0b55fbbc';
//   const category = 'world';
//   const url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + apikey;

//   const response = await fetch(url);
//   const data = await response.json();

//   return data.articles;
// }



export async function getDetaBase() {
  const deta = Deta(process.env.DATA)
  const dataBase = deta.Base('pnth-data')
  return dataBase
}


export function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  var answer = "Greetings!"

  if (hour >= 6 && hour < 12) {
    answer =  "Good morning"
    return answer
  } else if (hour >= 12 && hour < 18) {
    answer =  "Good afternoon"
    return answer
  } else if (hour >= 18 || hour < 6) {
    answer = "Good night"
    return answer
  } else {
    return answer
  }
}


export function getTimeOfDayMessage(): string {
  const now = new Date();
  const hour = now.getHours();
  
  // Define the messages for each time of day
  const messages = {
    morning: [
      "Good morning, time to start a new day!",
      "Rise and shine, it's morning time!",
      "Time to wake up and conquer the day!"
    ],
    afternoon: [
      "Good afternoon, how's your day going?",
      "Hope you're having a great afternoon so far!",
      "The day's not over yet, keep pushing!"
    ],
    evening: [
      "Good evening, time to wind down and relax!",
      "The day's almost over, finish strong!",
      "What did you accomplish today? Reflect on it and be proud."
    ],
    null : [
      "unable to get phrase"
    ]

  }

  // Determine which time of day it is
  let timeOfDay: keyof typeof messages = "null";
  if (hour < 12){
    timeOfDay = 'morning'
  } else if (hour < 18){
    timeOfDay = 'afternoon'
  } else {
    timeOfDay = 'evening'
  }

  // Get a random message from the appropriate time of day
  const messageIndex = Math.floor(Math.random() * messages[timeOfDay].length);
  return messages[timeOfDay][messageIndex];
}
