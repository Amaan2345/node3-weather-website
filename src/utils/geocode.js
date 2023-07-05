const request = require('request');
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW1hYW4wMDcxMjM0NSIsImEiOiJjbGptdjZ5OTMxOXlmM3FrMjcwN293a2JkIn0.6WgbmRZ7NaBB9t3iwsAw5w';
    request({url, json:true},(error, { body })=>{
        if(error){
            callback('unable to find the loaction',undefined);
        }else if(body.features.length===0){
            callback('unable to get weather details',undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;