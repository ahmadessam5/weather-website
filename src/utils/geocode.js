const rquest = require('request')

const geocode = (adress , callback )=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/g'+ encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoibWFkbzc0IiwiYSI6ImNsaWozcWYzbTA0OHYzcXBha3Fjcmc1cHUifQ.DWCZDGO62PCm3Fxg_H118A&limit=1'

    rquest({ url, json : true }, (error,{body} = {})=>{
        if(error){
            callback('Unable to connect to server!',undefined)
        }else if(body.features.length === 0 ) {
            callback('Unable to find location, Try another search.',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
               
            })
        }
    })
}
 module.exports = geocode