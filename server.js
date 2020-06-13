const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const api = require("./routes/api");

// Middlewares
const errorHandler = require('./middlewares/errorHandler');


const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));

//MongoDB
//PW:n7ioh5J1dKHoHH0T

mongoose.connect("mongodb+srv://khaoula:n7ioh5J1dKHoHH0T@networkdb-kdtpc.mongodb.net/network?retryWrites=true", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);



// API Routes

app.use("/api/v1", api);
app.use('/uploads', express.static('./uploads'));

// Frontend App
app.use('/', express.static(path.join(__dirname, './client/build')));
app.use('/*', express.static(path.join(__dirname, './client/build')));


app.use(errorHandler);


const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));