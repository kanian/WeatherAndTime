import { Config } from './Config'
import {LocalTime} from './LocalTime'
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
        const currentTime = LocalTime.calcTime(this.timeZoneOffset)
        const conditions = result.response[0];
        return {
          'location': conditions.place.name,
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
}


export { CurrentWeather }
