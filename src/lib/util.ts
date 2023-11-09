import axios from 'axios'
import { JSONResponse } from './types';
import { Deta } from "deta";
import { time } from 'console';

export async function getWeatherAPI() {
  const params = {
    access_key: process.env.WEATHER,
    query: 'New York',
    units: 'f'
  }

  return (await axios.get('http://api.weatherstack.com/current', { params })).data as JSONResponse

}

export async function getNewsAPI() {
  const apikey = process.env.NEWS;
  const category = 'world';
  const url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + apikey;

  const response = await fetch(url);
  const data = await response.json();

  return data.articles;
}



export async function getDetaBase() {
  const deta = Deta(process.env.DATA)
  const dataBase = deta.Base('pnth-data')
  return dataBase
}


export function getGreeting() {
  const now = new Date();
  const hour = now.getUTCHours();
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
  const hour = now.getUTCHours();

  // Define the messages for each time of day
  const messages = {
    morning: [
      "Good morning! Let's create a fantastic day ahead.",
      "Rise and shine! Embrace the possibilities of a new morning.",
      "Seize the day and make it extraordinary!",
      "Each morning brings new potential. Make today amazing!",
      "Wake up with a smile, ready to make a difference."
    ],
    afternoon: [
      "Good afternoon! How's your day shaping up?",
      "Hope your day is filled with productivity and joy!",
      "The afternoon sun invites us to keep achieving.",
      "Take a moment to recharge for the rest of the day.",
      "Embrace the tasks ahead; success awaits in the afternoon."
    ],
    evening: [
      "Time to unwind and relax. You deserve it!",
      "Reflect on your achievements today and be proud.",
      "An evening of peace sets the tone for a tranquil night.",
      "Evening offers a canvas to paint a better tomorrow.",
      "As the day winds down, cherish moments of tranquility."
    ],
    null: [
      "Unable to retrieve a phrase for this moment."
    ]
  }
  

  // Determine which time of day it is
  let timeOfDay: keyof typeof messages = "null";
  if (hour >= 6 && hour < 12) {
    timeOfDay = "morning"
  } else if (hour >= 12 && hour < 18) {
    timeOfDay =  "afternoon"
  } else if (hour >= 18 || hour < 6) {
    timeOfDay = "evening"
  } 

  // Get a random message from the appropriate time of day
  const messageIndex = Math.floor(Math.random() * messages[timeOfDay].length);
  return messages[timeOfDay][messageIndex];
}


export function daysuntilBreak(school: string): string {
  let lastDay: Date;

  switch (school) {
    case "AF":
      lastDay = new Date("November 20, 2023");
      break;
    case "MD":
    case "BTHS":
      lastDay = new Date("November 23, 2023");
      break;
    default:
      return "Invalid school";
  }

  const currentDate = new Date();

  if (currentDate > lastDay) {
    return "School is already over";
  } else if (currentDate.toDateString() === lastDay.toDateString()) {
    return "School is over";
  } else {
    const timeDifference = lastDay.getTime() - currentDate.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return `There are ${daysRemaining} days until the next break.`;
  }
}
