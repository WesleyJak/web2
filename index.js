const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(express.static("media"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

const users = {};
users['admin'] = {'name': 'admin', 'password': 'admin', 'phone': 3337777, 'logins': 0};

app.get('/', function(req, res){
    res.status(200).render('login');
});

app.get('/login', function(req, res) {
    res.status(200).render('login');
});

app.post('/launch', (req, res) =>{
    const {name, password} = req.body;
    if(users[name]['password'] === password){
        users[name]['logins'] += 1;
        res.render('launch', users[name]);
    }else{
        res.render('failure');
    }
});

app.post('/submitconfirm', (req, res) => {
    const {name, phone, password} = req.body;
    users[name] = {"name": name, "phone": phone, "password": password};
    res.render('submitconfirm', users[name]);
});

app.get('/launch', function(req, res){
    res.status(200).render('launch')
});

app.get('/writing', function(req, res){
    res.status(200).render('writing');
});

app.get('/infoform', function(req, res){
    res.status(200).render('infoform');
});

app.listen(port, function() {
    console.log(`Started web2 app on port ${port}`)
});