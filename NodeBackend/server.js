/* ---------- Load Modules ---------- */
const express = require('express');
const app = express();
const mongoose = require('mongoose'); // mongoose for mongodb
//var morgan = require('morgan'); // logging to console
//var bodyParser = require('body-parser'); // pull information from HTML POST
//var methodOverride = require('method-override'); // simulate DELETE and PUT
const dotenv = require("dotenv")
const cors = require('cors');

const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const jobRoute = require("./routes/job")


dotenv.config()

/* ---------- Configurations ---------- */
// DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection successfull"))
    .catch((err) => {
        console.log(err);
    });

// Express
app.use(express.json())
app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/jobs",jobRoute);



app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running")
})

// var app = express(); // create our express app
// app.set('port', process.env.PORT || 8080);
// app.set('static_root_path', __dirname + '/public');
// app.use(express.static(app.get('static_root_path'))); // set the static files location /public/

// // Mix
// app.use(morgan('dev')); // logging to console
// app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
// app.use(bodyParser.json()); // parse application/json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());


// /* ---------- Routes ---------- */
// require('./app/routes')(app);


// /* ---------- Initialize ---------- */
// app.listen(app.get('port'));
// console.log('App Started on ' + app.get('port') + ' @ ' + Date());