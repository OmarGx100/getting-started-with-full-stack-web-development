const path = require("path");

const express = require("express");


const defaultRoutes = require('./routes/default');
const restaurantsRoutes = require('./routes/restaurants');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRoutes);
app.use('/', restaurantsRoutes);






// use will be called if neither of the top endpoints are called and this typically mean that the user enter wrong url or something
app.use(function(req, res){

  res.status(404).render('404');
});

// this middleware is used to responed for server side errors
app.use(function(error, req, res, next) {
  res.render('500')
});



app.listen(3000);
