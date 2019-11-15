const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000;
const todoRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use('/todos', todoRoutes)


mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todos", {useNewUrlParser: true});

const connection = mongoose.connection
connection.once("open", function (){
    console.log("MongoDB database connection established successfully")
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});