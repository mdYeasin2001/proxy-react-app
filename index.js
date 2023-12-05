const express = require('express');
const path = require('path');

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

app.get('/health', (req, res) => {
    res.send("Health is good")
})

// Handle all routes and serve the main HTML file
app.get('*', (__, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})