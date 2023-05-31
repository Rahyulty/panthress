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
      "Good morning, time to start a new day!",
      "Rise and shine, it's morning time!",
      "Time to wake up and conquer the day!",
      "A new day, a new opportunity. Let's make the most of it!",
      "Wake up with determination, go to bed with satisfaction!",
    ],
    afternoon: [
      "Good afternoon, how's your day going?",
      "Hope you're having a great afternoon so far!",
      "The day's not over yet, keep pushing!",
      "Halfway through the day, keep up the good work!",
      "The afternoon knows what the morning never suspected. Enjoy it!",
      "A productive afternoon will always lead to a successful day."
    ],
    evening: [
      "Time to wind down and relax!",
      "The day's almost over, finish strong!",
      "What did you accomplish today? Reflect on it and be proud.",
      "Evening is a time of real experimentation. You never want to look the same way.",
      "An evening walk is a great way to reflect on the day and plan for tomorrow!",
      "The day is done, let's rest and recharge for tomorrow."
    ],
    null: [
      "unable to get phrase"
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


export function daysUntilLastDayOfSchool(school: string): string {
  let lastDay: Date;

  switch (school) {
    case "AF":
      lastDay = new Date("June 13, 2023");
      break;
    case "MD":
    case "BTHS":
      lastDay = new Date("June 27, 2023");
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
    return `There are ${daysRemaining} days until the last day of school.`;
  }
}
