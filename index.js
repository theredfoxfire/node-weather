const request = require('request');

const apiKey = 'b6907d289e10d714a6e88b30761fae22';

const fetchWeatherAPI = url => {
  return request(url, function(err, response, body) {
    if(err){
      console.log('error:', err);
    } else {
      console.log('body:');
      console.log(JSON.parse(body));
    }
  });
}

const getWeatherByLocZip = arrayOfLocationZip => {
  let weatherFetchList = [];

  arrayOfLocationZip.forEach((val) => {
    let city = val.location;
    let zip = val.zip;
    let urlByCity = `https://samples.openweathermap.org/data/2.5/forecast?q=`+city+`&appid=`+apiKey;
    let urlByZip = `https://samples.openweathermap.org/data/2.5/forecast?zip=`+zip+`&appid=`+apiKey;
    weatherFetchList.push(fetchWeatherAPI(urlByCity));
    weatherFetchList.push(fetchWeatherAPI(urlByZip));
  })

  Promise.all(weatherFetchList).then((values) => {
    console.log(values);
  });
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question(`Give me array of location & zip object ex: [{"location": "portland", "zip": "99524"}] : `, (paramData) => {
  getWeatherByLocZip(JSON.parse(paramData));
  readline.close();
});
