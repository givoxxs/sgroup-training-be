import express from 'express';
import fs from 'fs';

const app = express()
app.use(express.json())

const USERS_FILE = 'users.json';

//Read data from users.json
const readUsers = () => {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data)
};

//Write data users to file
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

app.get('/', (req, res) => {
    // req.user; 
    // check ai login chua
    res.json('HOME PAGE')
})

// get All Users
app.get('/users', (req, res) => {
    const users = readUsers();
    res.json(users);
})

// get User by id 
app.get('/users/:id', (req, res) => {
    const users = readUsers();
    const index = users.findIndex(u => u.id === parseInt(req.params.id))
    if (index != -1)  {
        res.json(users[index]);
    } else {
        res.status(404).json('User not found');
    }
})

// Post a new user
app.post('/users', (req, res) => {
    const users = readUsers();
    users.sort((a, b) => a.id - b.id);
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    writeUsers(users);
    res.status(201).json(newUser);
});

// PUT to update user by id
app.put('/users/:id', (req, res) => {
    const users = readUsers();
    const index = users.findIndex(u => u.id === parseInt(req.params.id))
    if (index !== -1)  {
        users[index].name = req.body.name;
        users[index].email = req.body.email;
        writeUsers(users);
        res.json(users[index]);
    } else {
        res.status(404).json('User not found');
    }
})

// Delete User by id
app.delete('/users/:id', (req, res) => {
    let users = readUsers();
    const index = users.findIndex(u => u.id === parseInt(req.params.id))
    if (index != -1)  {
        const delUser = users.splice(index, 1);
        writeUsers(users);
        res.json(delUser[0]);
    } else {
        res.status(404).json('User not found');
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})