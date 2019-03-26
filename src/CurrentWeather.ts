import { Config } from './Config'
import * as request from 'request-promise'

const CurrentWeather = class {
    timeZoneOffset: any;
  
  async getCurrentConditions(locationAndTimeOffset: any) {
    this.timeZoneOffset = locationAndTimeOffset.timeZoneOffset;
    const options = this.getCurrentConditionsOptions(locationAndTimeOffset.location);
    try {
      return request(options).then(this.processCurrentConditions.bind(this))
    } catch (err) {
      console.log('Failed to retrieve data');
      console.log(err);
    }

  }
  getCurrentConditionsOptions(location: any) {
    return {
      uri: Config.currentConditionsAPIUrl,
      qs: {
        client_id: Config.clientId,
        client_secret: Config.clientSecret,
        p: location.lat + ',' + location.long,
        limit: 1
      },
      json: true
    }

  }
  processCurrentConditions(result) {
    if (result !== null) {
      if (result.success === true) {
        const currentTime = this.calcTime(this.timeZoneOffset)
        const conditions = result.response[0];
        return {
          'currentTime': currentTime,
          'observationTime': conditions.obDateTime,
          'weather': {
            'weather': conditions.ob.weather,
            'temperatureC': conditions.ob.tempC,
            'temperatureF': conditions.ob.tempF,
            'details': conditions.ob
          }
        }
      } else {
        return result.error
      }
    }
  }

  private calcTime(timeZoneOffset: number){
    const d = new Date()
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const offsetInHours = timeZoneOffset/3600;    
    return new Date(utc + (3600000*offsetInHours)).toLocaleString();
  }
}


export { CurrentWeather }
