// Generated by LiveScript 1.2.0
(function(){
  var airbnb, eviterra, ostrovok, aviasales, flatora;
  // http://airbnbapi.org/
  // spoof the browser
  airbnb = require("./airbnb");
  // no longer exists
  eviterra = require("./eviterra");
  // now requires authentication at this endpoint
  // https://partner.ostrovok.ru/api/affiliate/v2
  ostrovok = require("./ostrovok");
  // incorrect signature
  aviasales = require("./aviasales");
   // only works in russia
  flatora = require("./flatora");

  exports.hotelProviders = [airbnb];
  exports.flightProviders = []; //aviasales, eviterra
  exports.allProviders = exports.hotelProviders.concat(exports.flightProviders);
}).call(this);
