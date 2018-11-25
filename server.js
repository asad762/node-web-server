const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Could not append to log');
    }
  });
  next();
});
/***This block is for mentainance start****/
// app.use((req,res,next) => {
//   res.render('mentaining.hbs');
// });
/***This block is for mentainance end****/

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
 return text.toUpperCase();
});
app.get('/',(req, res) => {
res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeNote: 'Welcome visitor',
  });

});

app.get('/about',(req,res) => {
res.render('about.hbs', {
  pageTitle: 'About Page',

});
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Some internal error occured,please try later'
  });
});
app.listen(3000, () => {
  console.log('server is up on port 3000');
});
