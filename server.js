const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>
  {
    if(err) {
      console.log('Unable to append to server log');
    }
  })
  next();
})

app.use((req, res, next) => {
  res.render('maintenance',{
    pageTitle: 'Ow!, hay mantenimiento t.t',
    subTitle:'Hay demasiada tristeza en este mundo'
  })
})

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!!!</h1>');
  // res.send({
  //   name: 'And',
  //   likes: ['viking','plays']
  // });
  res.render('welcome.hbs', {
    pageTitle: 'OWWW !! Welcome',
    welcome: 'Le Welcome!!!!!!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'OWww!! AoutPage'
  });
});

app.get('/bad',(req, res) => {
  res.send({
    error: 'AAAAAHHHHH!!!',
    type: 'Explotion!'
  })
});

app.listen(3000, ()=>{
  console.log('Server is up in port 3000')
});
