var express = require('express'); // For making a server
var bodyParser = require('body-parser'); // For sending POST requests
var app = express(); // Our express app

// Defineing the ejs
app.set('view engine', 'ejs');

app.use(express.static('.'));

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

var data = [];

app.get('/todo', (req, res) => {
    res.render('todoPage', {
        'mydata': data
    });
});

app.post('/todo', urlencodedParser, (req, res) => {
    data.push(req.body);
    res.json(data);
});

app.delete('/todo/:item', (req, res) => {
    // console.log(req.url);
    data = data.filter(function (x) {
        return (x.item !== req.params.item);
    });
    res.json(data);
});


app.listen(3000, () => {
    console.log('App listening on port 3000!');
});