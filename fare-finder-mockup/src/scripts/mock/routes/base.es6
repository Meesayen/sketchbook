import { randomList } from './utils.es6';
import { finance, address } from '../lib/faker.js';

export var destinations = {
  success: () => ({
    info: 'Start typing anywhere to filter by country, name or code.',
    bestDestinations: randomList(20, function() {
      return {
        code: finance.currencyCode(),
        name: address.streetName(),
        country: address.country()
      };
    })
  }),
  failure: () => ({
    message: 'Oh no, man, I am sorry. It looks broken.'
  })
};

// Little trick until es6-module-transpiler would support the new syntax:
// import { * as moduleName } from './moduleName';
export default {
  destinations: destinations
};
