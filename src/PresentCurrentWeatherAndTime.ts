const PresentCurrentWeatherAndTime = class {

  private localConditions: any[] = [];
  constructor(dataArray, locationFectcher, weatherFetcher) {
    let answer: any[] = [];
    for (var i = 0; i < dataArray.length; i++) {
      const res = locationFectcher.getGeolocation()
        .then(weatherFetcher.getCurrentConditions.bind(weatherFetcher))
        .then(this.show)
        .then(this.saveAnswer.bind(this))
    }
  }
  saveAnswer = result => this.localConditions.push(result)
  show = answer => {
    console.log(`Location: ${answer.location}`)
    console.log(`Current time: ${answer.currentTime}`)
    console.log(`Current weather: ${answer.weather.weather}`);
    console.log(`Current temperature: ${answer.weather.temperatureF}F`)
    return answer
  }
  getLocalConditions(){
    return this.localConditions
  }
}

export { PresentCurrentWeatherAndTime }

