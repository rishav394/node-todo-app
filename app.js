var express = require('express'); // For making a server
var bodyParser = require('body-parser'); // For sending POST requests
var app = express(); // Our express app
var mongoose = require('mongoose');

// Defineing the ejs
app.set('view engine', 'ejs');

app.use(express.static('.'));

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var cred = 'username:password'; // NOTE: It should be urlencoded
var port = 80;
if (process.argv[2] !== undefined) {
    cred = process.argv[2];
}

mongoose.connect('mongodb://' + cred + '@ds133017.mlab.com:33017/mytodoapp');

// Create a schema
var schema = new mongoose.Schema({
    item: String
});

// Creating model
var MyModel = mongoose.model("MyModel", schema);

app.get('/', (req, res) => {
    res.send("hi");
});

app.get('/todo', (req, res) => {
    MyModel.find({}, function (err, data) {
        if (err) throw err;
        res.render('todoPage', {
            'mydata': data
        });
    });
});

app.post('/todo', urlencodedParser, (req, res) => {
    MyModel(req.body).save(function (err, data) {
        if (err) throw err;
        console.log('Item saved');
        res.json(data);
    });
});

app.delete('/todo/:item', (req, res) => {
    MyModel.find({
        item: req.params.item
    }).remove(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

app.listen(port, () => {
    console.log('App listening on port ' + port + '!');
});