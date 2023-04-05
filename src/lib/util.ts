require('dotenv').config()
const axios = require('axios')

export function celsiustoFarenheit(celsius : number) {
  var cTemp = celsius;
  var cToFahr = cTemp * 9 / 5 + 32;
  return cToFahr
}

// @ts-ignore
export const getweatherAPI = async (): any => {
  const params = {
    access_key: process.env.WEATHER,
    query: 'New York'
  }

  axios.get('http://api.weatherstack.com/current', { params })
      .then((response: { data: any; }) => {
        const apiResponse = response.data;
        console.log(apiResponse)
        return apiResponse 
      }).catch((error: any) => {
        console.log(error);

      });

}