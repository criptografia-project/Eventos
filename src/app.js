// requiero express
const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path');

// ejecutar express y recibir un objeto
const app = express();
//const routes = require('./routes/index')

// Settings 
app.set('port',process.env.PORT || 3003);
//app.set('views', path.join(__dirname,'views'));
// ejs motor de plantillas
//app.set('view engine', 'ejs');

// Midlewares 
/*app.use((req,res, next) => {
    console.log('${req.url} -${req.method}');
    next();
});*/
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

// Routes 
require('./routes/eventRoutes')(app);
require('./routes/reservationRoutes')(app);



// Start Server
app.listen(app.get('port'), () =>{
    console.log('Server on port',app.get('port'))
})