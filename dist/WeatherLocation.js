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
const WeatherLocation = class {
    constructor(info) {
        this.location = undefined;
        this.postalCode = undefined;
        this.location = info[0];
        this.postalCode = info[1];
    }
    getGeolocation() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = this.getGeolocationOptions();
            try {
                return request(options).then(this.processGeolocation.bind(this));
            }
            catch (err) {
                console.log('Failed to retrieve data');
                console.log(err);
            }
        });
    }
    getGeolocationOptions() {
        return this.postalCode !== undefined ? this.getGeolocationByPostalCodeOptions() : this.getGeolocationByPlaceNameOptions();
    }
    getGeolocationByPlaceNameOptions() {
        return {
            uri: Config_1.Config.locationAPIUrl,
            qs: {
                client_id: Config_1.Config.clientId,
                client_secret: Config_1.Config.clientSecret,
                query: 'name:' + this.location,
                limit: 1
            },
            json: true
        };
    }
    getGeolocationByPostalCodeOptions() {
        return {
            uri: Config_1.Config.locationAPIUrlPostal + this.postalCode,
            qs: {
                client_id: Config_1.Config.clientId,
                client_secret: Config_1.Config.clientSecret,
            },
            json: true
        };
    }
    processGeolocation(result) {
        if (result !== null) {
            if (result.success === true) {
                const response = result.response[0] === undefined ? result.response : result.response[0];
                return { location: response.loc, timeZoneOffset: response.profile.tzoffset };
            }
            else {
                return result.error;
            }
        }
        return null;
    }
};
exports.WeatherLocation = WeatherLocation;
//# sourceMappingURL=WeatherLocation.js.map