const { sequelize, User, Post } = require('./models');
const express = require('express');

const app = express();

app.use(express.json());

// Create user
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        return res.status(200).json({ user: user });
    } catch (error) {
        return res.status(500).json({ message: error.errors[0].message });
    }
});


// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json({ users: users });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal sever error!" });
    }
});


// Get user by name
app.get('/users/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const user = await User.findOne(
            { where: { name: name }, include: 'posts' }
        );
        return res.status(200).json({ user: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal sever error!" });
    }
});


// Delete user
app.delete('/users/:uuid', async (req, res) => {
    const { uuid } = req.params;

    try {
        const user = await User.findOne({ where: { uuid: uuid } });
        await user.destroy();
        return res.status(204).json({ message: "Deleted" });
    } catch (error) {
        return res.status(500).json({ message: error.errors[0].message });
    }
});


// Update user
app.put('/users/:uuid', async (req, res) => {
    const { name, email } = req.body;
    const { uuid } = req.params;

    try {
        const user = await User.findOne({ where: { uuid: uuid } });

        await user.update({ name: name, email: email })

        return res.status(200).json({ user: user });
    } catch (error) {
        return res.status(500).json({ message: error.errors[0].message });
    }
});


// Create post
app.post('/posts', async (req, res) => {
    const { userUUID, message } = req.body;

    try {
        const user = await User.findOne({ where: { uuid: userUUID } });
        const post = await Post.create({ message, userId: user.id });

        return res.status(200).json({ post: post });
    } catch (error) {
        return res.status(500).json({ message: error.errors[0].message });
    }
});


// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: 'user'
        });

        return res.status(200).json({ posts: posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal sever error!" });
    }
});


app.listen(5000, async () => {
    await sequelize.authenticate();
    console.log("listening on 5000")
});