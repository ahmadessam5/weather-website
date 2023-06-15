const rquest = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a1faa788c005b2e8348703234ce1b042&query='+latitude+','+longitude+'&units=m'
   
    rquest( { url, json: true }, ( error, {body} )=>{
        
             if (error){
                callback('Unable to connect to server' , undefined)
             }else if (body.error){
                callback('wrong location  ',undefined)
             }else{
                const temp = body.current.temperature
                const feelLikeTemp = body.current.feelslike
                const humidity = body.current.humidity
                callback(undefined, body.current.weather_descriptions[0] +' it now ' + temp + ' degree but it feels like ' + feelLikeTemp+' degree out ' + 'the humidity is '+humidity+'%.')
                // weather_descriptions:response.body.current.weather_descriptions[0],
                // temp: response.body.current.temperature,
                // feelLikeTemp:response.body.current.feelslike
        } 
    })
}

module.exports = forecast