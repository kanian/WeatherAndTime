"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WeatherLocation_1 = require("./WeatherLocation");
const CurrentWeather_1 = require("./CurrentWeather");
let localConditions = [];
const currentWeatherAndTime = dataArray => {
    let answer = [];
    for (var i = 0; i < dataArray.length; i++) {
        const locationFectcher = new WeatherLocation_1.WeatherLocation(dataArray[i]);
        const weatherFetcher = new CurrentWeather_1.CurrentWeather();
        const res = locationFectcher.getGeolocation()
            .then(weatherFetcher.getCurrentConditions.bind(weatherFetcher))
            .then(show)
            .then(saveAnswer);
    }
    return answer;
};
const saveAnswer = result => localConditions.push(result);
const show = answer => {
    console.log(answer);
    return answer;
};
const answer = currentWeatherAndTime([['Abidjan'], ['Cairo']]);
//# sourceMappingURL=index.js.map