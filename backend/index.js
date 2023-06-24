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

const Recipies = require('./models/recipies');


app.get('/api/recipies', async (req, res) => {
    const recipies = await Recipies.find();
    res.json(recipies);
});

app.post('/api/recipe/save', async (req, res) => {
    const recipe = await Recipies.create(req.body);
    if(!recipe) 
        return res.json({status: 'error', error: 'Invalid recipe'});
    res.json({status: 'ok'});
});

app.delete('/api/recipe/delete/:id', async (req, res) => {
    const id = req?.params?.id;
    const recipe = await Recipies.findByIdAndDelete(id);
    if(!recipe) 
        return res.json({status: 'error', error: 'Invalid recipe'});
    res.json({status: 'ok'});
});

app.get('/api/recipe/:id', async (req, res) => {
    const id = req?.params?.id;
    const recipe = await Recipies.findById(id);
    if(!recipe)
        return res.json({status: 'error', error: 'Invalid recipe'});
    res.json(recipe);
});

app.put('/api/recipe/update/:id', async (req, res) => {
    const id = req?.params?.id;
    const recipe = await Recipies.findByIdAndUpdate(id, req.body);
    if(!recipe)
        return res.json({status: 'error', error: 'Invalid recipe'});
    res.json({status: 'ok'});
});

app.listen(3002, () => {
    console.log('Server is running on port 3002');
});