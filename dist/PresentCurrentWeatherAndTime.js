"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WeatherLocation_1 = require("./WeatherLocation");
const CurrentWeather_1 = require("./CurrentWeather");
const PresentCurrentWeatherAndTime = class {
    constructor(dataArray) {
        this.localConditions = [];
        this.saveAnswer = result => this.localConditions.push(result);
        this.show = answer => {
            console.log(`Location: ${answer.location}`);
            console.log(`Current time: ${answer.currentTime}`);
            console.log(`Current weather: ${answer.weather.weather}`);
            console.log(`Current temperature: ${answer.weather.temperatureF}F`);
            return answer;
        };
        let answer = [];
        for (var i = 0; i < dataArray.length; i++) {
            const locationFectcher = new WeatherLocation_1.WeatherLocation(dataArray[i]);
            const weatherFetcher = new CurrentWeather_1.CurrentWeather();
            const res = locationFectcher.getGeolocation()
                .then(weatherFetcher.getCurrentConditions.bind(weatherFetcher))
                .then(this.show)
                .then(this.saveAnswer.bind(this));
        }
    }
    getLocalConditions() {
        return this.localConditions;
    }
};
exports.PresentCurrentWeatherAndTime = PresentCurrentWeatherAndTime;
//# sourceMappingURL=PresentCurrentWeatherAndTime.js.map