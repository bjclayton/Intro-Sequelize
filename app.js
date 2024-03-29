const { sequelize, User } = require('./models');
const express = require('express');

const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        return res.status(200).json({ user: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal sever error!" });
    }
});


app.get('/get-users', async (req, res) => {
    try {
        const user = await User.findAll();
        return res.status(200).json({ users: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal sever error!" });
    }
});


app.get('/users/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const user = await User.findOne({ where: { name: name } });
        return res.status(200).json({ users: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal sever error!" });
    }
});

app.listen(5000, async () => {
    await sequelize.authenticate();
    console.log("listening on 5000")
});