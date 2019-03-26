import { Config } from './Config'
import * as request from 'request-promise'

const WeatherLocation = class {
  location: string = undefined
  postalCode: string = undefined
  constructor(info: string[]) {
    this.location = info[0]
    this.postalCode = info[1]
  }

  async getGeolocation() {
    const options = this.getGeolocationOptions()
    try {
      return request(options).then(this.processGeolocation.bind(this))

    } catch (err) {
      console.log('Failed to retrieve data');
      console.log(err);
    }
  }

  getGeolocationOptions() {
    return {
        uri: Config.locationAPIUrl,
        qs: {
          client_id: Config.clientId,
          client_secret: Config.clientSecret,
          query: 'name:'+this.location,
          limit:1
        },
        json: true
      }
  }
  processGeolocation(result) {
    if (result !== null) {
      if (result.success === true) {
        return {location: result.response[0].loc, timeZoneOffset: result.response[0].profile.tzoffset};
      } else {
        return result.error
      }
    }
    return null
  }

}


export { WeatherLocation }
