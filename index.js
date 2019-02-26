let request = require('request');

let apiKey = '08b43a8f22b2b7109b3736788b4af11b';
let city = 'portland';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:');
    console.log(JSON.parse(body));
  }
});
