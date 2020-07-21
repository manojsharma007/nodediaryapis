var express = require('express');
const app = express();
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const userService = require('./user.service');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'manojksh'
});
var userArray = [];
connection.query(
    'SELECT * FROM diary_users',
    function (err, results, fields) {
        userArray = results;
    }
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization");
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
function findUser(array, username, password) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].username == username && array[i].password == password) {
            return array[i];
        }
    }
    return null;
}
const users = userArray;
app.get('/api', function (req, res) {
    res.json({
        text: 'my api!'
    });
});
app.get('/api/getAllUsers', function (req, res) {
    res.json(userArray)
})

app.post('/api/login', function (req, res) {
    var user = findUser(userArray, req.body.username, req.body.password);
    if (user) {
        const token = jwt.sign({ username: user.username, firstname: user.firstName }, 'my_secret_key');
        const { password, ...userWithoutPassword } = user;
        res.json({
            ...userWithoutPassword,
            token
        })
    }
    else {
        res.json({
            "msg": "The username or password is incorrect"
        })
    }
})

app.get('/api/protected', ensureToken, function (req, res) {
    jwt.verify(req.token, 'my_secret_key', function (err, data) {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                text: 'this is protected',
                data: data
            })
        }
    })

})

function ensureToken(req, res, next) {
    const beareHeader = req.headers['authorization'];
    if (typeof beareHeader !== 'undefined') {
        const bearer = beareHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }

}

app.get('/api/destroytoken', function (req, res) {
    //jwt.destroy(req.token);

})

app.listen(3000, function () {
    console.log('App listening on port 3000 !');
});

app.get('/api/allJournal', function (req, res) {
    userService.allJournal()
        .then(journal => res.json(journal))
        .catch(err => next(err));
})
app.post('/api/getJournal', function (req, res) {
    userService.getJournal(req)
        .then(journal => res.json(journal))
        .catch(err => next(err));
})

app.get('/api/getempolyeesbyId/:id', function (req, res) {
    userService.getempolyeesbyId(req.params.id)
        .then(emp => res.json(emp))
        .catch(err => next(err));

})
app.post('/api/addJournal', function (req, res) {
    userService.addJournal(req)
        .then(journal => res.json(journal))
        .catch(err => next(err));

})
app.post('/api/updateJournal', function (req, res) {
    userService.updateJournal(req)
        .then(journal => res.json(journal))
        .catch(err => next(err));
})
app.post('/api/deleteJournal', function (req, res) {
    userService.deleteJournal(req)
        .then(journal => res.json(journal))
        .catch(err => next(err));
})

app.get('/api/records', function (req, res) {
    userService.records()
        .then(emp => res.json(emp))
        .catch(err => next(err));

})
