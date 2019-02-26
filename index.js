let request = require('request');

let apiKey = 'b6907d289e10d714a6e88b30761fae22';

function fetchWeatherAPI(url) {
  return request(url, function (err, response, body) {
    if(err){
      console.log('error:', err);
    } else {
      console.log('body:');
      console.log(JSON.parse(body));
    }
  });
}

function getWeatherByLocZip(arrayOfLocationZip) {
  let weatherFetchList = [];

  arrayOfLocationZip.forEach(function (val) {
    let city = val.location;
    let zip = val.zip;
    let urlByCity = `https://samples.openweathermap.org/data/2.5/forecast?q=`+city+`&appid=`+apiKey;
    let urlByZip = `https://samples.openweathermap.org/data/2.5/forecast?zip=`+zip+`&appid=`+apiKey;
    weatherFetchList.push(fetchWeatherAPI(urlByCity));
    weatherFetchList.push(fetchWeatherAPI(urlByZip));
  })

  Promise.all(weatherFetchList).then(function(values) {
    console.log(values);
  });
}

let paramData = [{location: 'portland', zip: '99524'}, {location: 'Denver', zip: '80239'}];

getWeatherByLocZip(paramData);
