import { WeatherLocation } from "./WeatherLocation"
import { CurrentWeather} from "./CurrentWeather"
let localConditions: any[] = [];
const currentWeatherAndTime = dataArray => {
  let answer: any[] = [];
  for (var i = 0; i < dataArray.length; i++) {
    const locationFectcher = new WeatherLocation(dataArray[i])
    const weatherFetcher = new CurrentWeather();
    const res = locationFectcher.getGeolocation()
    .then(weatherFetcher.getCurrentConditions.bind(weatherFetcher))
    .then(show)
    .then(saveAnswer)
    }
  return answer;
}

const saveAnswer = result => localConditions.push(result)
const show = answer => {
  console.log(`Location: ${answer.location}`)
  console.log(`Current time: ${answer.currentTime}`)
  console.log(`Current weather: ${answer.weather.weather}`);
  console.log(`Current temperature: ${answer.weather.temperatureF}F`)
  return answer
}
const answer = currentWeatherAndTime([['Abidjan'],['Cairo']])

