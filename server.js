const express = require('express')
    , bodyParser = require('body-parser')
    , app = module.exports = express()
    , userCtrl = require('./userCtrl');
app.use(bodyParser.json());
app.get('/api/users', (req, res) => {
    let x = req.query;
    switch (x) {
        case x.favorites:
            return res.status(200).send(userCtrl.getUsersByFavorite());
        case x.age:
            return res.status(200).send(userCtrl.getUsersByAgeLimit());
        case x.last_name || x.email:
            return res.status(200).send(userCtrl.findUserByQuery());
        default:
            return res.status(200).send(userCtrl.readAll());
    }
});
app.get('/api/users/:id', (req, res) => {
    let x = userCtrl.findUserById(req.params.id);
    x !== null ? res.status(200).send(x) : res.status(404);
});
app.get('/api/admins', (req, res) => {
    return res.status(200).send(userCtrl.getAdmins());
});
app.get('/api/nonadmins', (req, res) => {
    return res.status(200).send(userCtrl.getNonAdmins());
});
app.put('/api/users/:id', (req, res) => {
    let x = req.params.id, y = req.body;
    return res.status(200).send(userCtrl.updateUser(x,y));
});
app.post('/api/users', (req, res) => {
    let y = req.body;
    return res.status(200).send(userCtrl.createUser(y));
});
app.delete('/api/users/:id', (req, res) => {
    let x = req.params.id;
    return res.status(200).send(userCtrl.removeUser(x));
});



