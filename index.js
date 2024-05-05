const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
const corsOptions = {
    origin: 'https://socail-app-frontend-nqxas68mo-magicalking03s-projects.vercel.app/', // Replace with your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions))
app.use(express.json())
const mongoose = require('mongoose')

try {
    mongoose.connect(process.env.MONGO_DB);
    console.log('MongoDB connected!!!')
} catch (e) {
    console.log('MongoDB connection error: ', e)
}

const userSchema = new mongoose.Schema({
    name: { type: String },
    number: { type: String },
    email: { type: String },
    profilePic: { type: String },
    coverPic: { type: String },
    gender: { type: String },
    dateOfBirth: { type: String },
    hobby: { type: String },
})
const User = mongoose.model('users', userSchema)

app.get('/', async (req, res) => {
    res.json("Backend work")
})

app.get('/home', async (req, res) => {
    res.json("home")
})

app.post('/save', async (req, res) => {
    console.log(req.body)
    let { userName, phNo, email, profilePic, coverPic, gender, dateOfBirth, hobby } = req.body;
    let result = new User({
        name: userName,
        number: phNo,
        email: email,
        profilePic: profilePic,
        coverPic: coverPic,
        gender: gender,
        dateOfBirth: dateOfBirth,
        hobby: hobby,
    })
    result.save()
    console.log(result)
    console.log('Data saved')
    res.send(result)
})

app.get('/api-users', async (req, res) => {
    res.json("api-users")
    let users = await User.find()
    res.json(users)
})

app.post('/update', async (req, res) => {
    let { nameValue, numberValue, emailValue, profilePic, coverPic, gender, dateOfBirth, hobby } = req.body
    let data = await User.updateOne({ email: emailValue },
        {
            $set: {
                name: nameValue,
                number: numberValue,
                email: emailValue,
                profilePic: profilePic,
                coverPic: coverPic,
                gender: gender,
                dateOfBirth: dateOfBirth,
                hobby: hobby, 
            }
        })
    res.send(data)
})

app.post('/delete', async (req, res) => {
    let { email } = req.body;
    let userData = await User.deleteOne({ email: email })
    res.send(userData)
})

app.listen(4000)