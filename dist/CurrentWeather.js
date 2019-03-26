"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Config");
const request = require("request-promise");
const CurrentWeather = class {
    getCurrentConditions(locationAndTimeOffset) {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeZoneOffset = locationAndTimeOffset.timeZoneOffset;
            const options = this.getCurrentConditionsOptions(locationAndTimeOffset.location);
            try {
                return request(options).then(this.processCurrentConditions.bind(this));
            }
            catch (err) {
                console.log('Failed to retrieve data');
                console.log(err);
            }
        });
    }
    getCurrentConditionsOptions(location) {
        return {
            uri: Config_1.Config.currentConditionsAPIUrl,
            qs: {
                client_id: Config_1.Config.clientId,
                client_secret: Config_1.Config.clientSecret,
                p: location.lat + ',' + location.long,
                limit: 1
            },
            json: true
        };
    }
    processCurrentConditions(result) {
        if (result !== null) {
            if (result.success === true) {
                const currentTime = this.calcTime(this.timeZoneOffset);
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
                };
            }
            else {
                return result.error;
            }
        }
    }
    calcTime(timeZoneOffset) {
        const d = new Date();
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const offsetInHours = timeZoneOffset / 3600;
        return new Date(utc + (3600000 * offsetInHours)).toLocaleString();
    }
};
exports.CurrentWeather = CurrentWeather;
//# sourceMappingURL=CurrentWeather.js.map