const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode=require('./utils/geocode');
const forecast= require('./utils/forecast');


const app = express();
const publicDirPath= path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));
app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather',
        name:'Amaan Saira'

    });
})
app.get('/about',(req,res)=>{
    res.render('about', {
        title:'About',
        name:'Amaan Shaikh'
    });
})
app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Help',
        name: 'Amaan Hafiz Shaikh'
    })
})

app.get('',(req,res)=>{
    res.send('Hello express$%^&*@@#$uehdfjw efkjwekjfkjwdkjkjb  wjkdkj  dkjdkjb%^&8!')
})
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a Address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        name: 'AmaanS',
        Error:'Page not Available'
    })
})
app.get('*',(req,res)=>{
    res.render('404', {
        title: '404',
        name:'Amaan',
        Error:'Page not found'
    })
})
app.listen(3000, ()=>{
    console.log('Server is up on post 3000')
})
