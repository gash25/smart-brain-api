const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()

        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()

        }        
    ]
}

app.get('/', (req,res) => {
    res.json(database.users);
})

app.post('/signin', (req,res)=> {
    let found = false;
    console.log(req.body);
    console.log(database.users);
    database.users.forEach(user => {
        if (user.email === req.body.email && user.password === req.body.password) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req,res)=> {
    console.log(req.body);
    const { email, name, password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date(),
        password: password    

    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(400).json('no such user');
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('no such user');
    }      
})

/* bcrypt.hash('bacon', 8, function(err, hash) {
});

// As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
bcrypt.compare("bacon", hash).then((res) => {
    // res === true
}); */

app.listen(3001, () => {
    console.log('running on port 3001');
})