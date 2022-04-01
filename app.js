// Initialize express
const express = require('express');
const app = express();

// require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const { Sequelize } = require('sequelize')

// Use "main" as our default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));

// Use handlebars to render
app.set('view engine', 'handlebars');

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const models = require('./db/models');

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!');
});

// index
app.get('/', (req, res) => {
  models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
    res.render('events-index', { events: events });
  });
});

// new event
app.get('/events/new', (req, res) => {
  res.render('events-new', {});
});

// create event
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err)
  });
});
