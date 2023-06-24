const express = require('express');
const cors = require('cors');
const app = express();


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ead").then(() => {
    console.log('Connected to the Database successfully');
}).catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.listen(3002, () => {
    console.log('Server is running on port 3002');
});