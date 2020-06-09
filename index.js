// WEATHER APP!

const request = require("request");
const express = require('express')
const app = express()
// require('dotenv').config()
const bodyParser = require('body-parser')
const apiKey = "9ce912cb8949cacfb4fc6938a87a437a"

//ejs is a template engine (renders a template turns it into HTML,CSS,and javascript while filling in variables.)
app.set('view engine', 'ejs')

//turning the information from the url and parsing to a json object.
//middleware function that gets run on every client request.
app.use(bodyParser.urlencoded({ extended: true }));

//allows us to use static folders for holding compliled css and pictures
app.use(express.static('public'));

// sends the response off. render the index.js file.
app.get('/', function (req, res) {
    res.render('index');
})

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {weather : null, error : 'Error please try again'})
        }
        else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', {weather : null, error : 'Error please try again'})
            } else {
                let weatherText = `Its ${weather.main.temp} degrees in ${weather.name}`
                //res.render keep rendering the HTML page to the client.
                res.render('index', {weather: weatherText, error:null})
            }
        }
    })
})

// request(url, function(err, response, body){
//     if(err){
//         console.log('error:', err)
//     }
//     else {
//         console.log('body:', body)

//         let weather = JSON.parse(body)
//         let message = `It's ${weather.main.temp} degrees in ${weather.name}`
//         console.log(message)
//     }
// });

//server port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`This server is running on ${port}`)
})


// In order for the app to work, open the "Views" directory and navigate to the index.ejs.
// Copy lines 16-22 in the index.ejs file and delete it. 
// go back to the website and reload the page. 
// go back to the index.ejs file and undo the code from lines 16-22.
// go back to the website and it should work. However, DO NOT *reload the page!!*