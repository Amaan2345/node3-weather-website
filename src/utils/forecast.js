const request = require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=970d5f5937fae3c81b76a3c2f22467b1&query=' + latitude + ' , ' + longitude + '&uints=f';
    request({url, json:true},(error, { body })=>{
        if(error){
            callback('unable to connect',undefined);
        }else if(body.error){
            callback('unable to find loaction',undefined);
        }else {
            callback(undefined,body.current.weather_descriptions[0] + ' It is currently '+ body.current.temperature + 'degrees out. It feels like '+ body.current.feelslike + '. The humidity is' + body.current.humidity + ' %' + 'The UV index today is ' + body.current.uv_index + ' The wind speed is '+ body.current.wind_speed + ' And the precip is ' +body.current.precip);


        }
    })
}

module.exports=forecast