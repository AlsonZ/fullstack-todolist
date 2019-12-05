require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const userRouter = require('./routes/users');
const listRouter = require('./routes/lists');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());

app.use('/users', userRouter);
app.use('/lists', listRouter);

app.listen(3001, () => console.log('server started'));