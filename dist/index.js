"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WeatherLocation_1 = require("./WeatherLocation");
let localConditions = [];
const currentWeatherAndTime = dataArray => {
    let answer = [];
    for (var i = 0; i < dataArray.length; i++) {
        const fetcher = new WeatherLocation_1.WeatherLocation(dataArray[i]);
        //const res = await fetcher.getCurrentConditions(await fetcher.getGeolocation())
        const res = fetcher.getGeolocation()
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