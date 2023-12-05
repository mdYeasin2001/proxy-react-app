const express = require('express');

const users = [
    { username: 'John Doe', email: 'john.doe@example.com', id: 1 }
];

const app = express();

app.use(express.json());

app.use(express.static('dist'));

app.get('/api/users', (req, res) => {
    res.send(users)
})

app.post('/api/users', (req, res) => {
    const { username, email } = req.body;
    // console.log(req.body);
    users.push({ username, email, id: users.length + 1 })
    // console.log(users);
    res.send(users)
})


app.listen(3000, () => {
    console.log('App listening on port 3000');
})