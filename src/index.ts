import { WeatherLocation } from "./WeatherLocation"

let localConditions: any[] = [];
const currentWeatherAndTime = dataArray => {
    let answer: any[] = [];
    for (var i = 0; i < dataArray.length; i++) {
        const fetcher = new WeatherLocation(dataArray[i])
        //const res = await fetcher.getCurrentConditions(await fetcher.getGeolocation())
        const res = fetcher.getGeolocation()
        .then(show)
        .then(saveAnswer)
    }
    return answer;
}

const saveAnswer = result => localConditions.push(result)
const show = answer => {
    console.log(answer)
    return answer
}
const answer = currentWeatherAndTime([['Abidjan'],['Cairo']])

