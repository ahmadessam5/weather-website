const path = require ('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode') 
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000   

// Defind paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templets/views')
const partialsPath = path.join(__dirname,'../templets/partials')


// Setup Handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Ahmad Essam'
    })
})
app.get(`/about`,(req, res) => {
    res.render('about',{
        title:'About Me',
        name: 'Ahmad Essam'
    })
})
app.get(`/help`, (req, res ) => {
    res.render('help',{
        helptext:'this is help page',
        title:'Help',
        name: 'Ahmad Essam'
    })
})
app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:'You must provide searc term'
        })
    }

    res.send({
        products: []
    })
})
app.get(`/weather`,(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an adress!'
        })
    }
    geocode (req.query.address, (error , {latitude , longitude , location} = {} ) =>{
        if(error){
            return res.send({error})
        }  
        forecast ( latitude, longitude, (error,forecastData)=>{
            if(error){
               return res.send({error})
            }

            res.send({     
                address:req.query.address,
                location,
                forecast: forecastData

            })
        } )
    })

    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage: 'Help articl not found!!',
        title:'404',
        name: 'Ahmad Essam'
    })
})              
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage: ' PAGE NOT FOUND!!',
        title:'404',
        name: 'Ahmad Essam'
    })
})

app.listen(port, () => { 
    console.log(`server is up on port 3000`)
})