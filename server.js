const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3001;
const routes = require('./routes')


// Define middleware here
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/public/"));
}
// Define API Routes
app.use(routes)

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

//Connect to mongoose

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });
const connection = mongoose.connection
connection.once("open", function () {
    console.log("MongoDB database connection established successfully")
})



app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});