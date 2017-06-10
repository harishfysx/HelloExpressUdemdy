const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static( __dirname + '/public'));

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.ip} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) =>{
    if(err){
      console.log('Unable to append to server.log');
    }
  })

  next();
});

/*
app.use((req,res,next) =>{
  res.render('ucs');
  //next();
});
*/

hbs.registerHelper('currentYear' , () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('upcaseIt' , (text) =>{
    return text.toUpperCase();
});


app.get('/', function (req, res) {
  res.render('index',{
    pageTitle : 'Welcome',
    welcomeMessage : 'Welcome to my website'
  });
});

app.get('/about', function (req, res) {
  res.render('about',{
    pageTitle : 'About',
    welcomeMessage : 'Welcome to my website'
  });
});



app.get('/bad',(req,res) =>{

  res.send({errorMessage :'bad request'});
} );


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});

//test
