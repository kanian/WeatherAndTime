
const Config = class {
  static clientId: string = '{you-aries-client-id-here}';
  static clientSecret: string = '{you-client-secret-here}';
  static currentConditionsAPIUrl: string = 'https://api.aerisapi.com/observations/closest'
  static locationAPIUrl: string = 'https://api.aerisapi.com/places/search'
  static locationAPIUrlPostal: string = 'https://api.aerisapi.com/places/postalcodes/'
}

export { Config }


