require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const listRouter = require('./routes/lists');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'this_is_a_secret_hash',
  resave: false,
  saveUninitialized: false
}));

app.use('/users', userRouter);
app.use('/lists', listRouter);

// for 192.168.0.19:3001 and gives ip of who is connecting
// app.listen(3001, '192.168.0.19', () => console.log('server started'));
// for localhost:3001 
app.listen(3001, () => console.log('server started'));

app.get('/', async (req, res) => {
  res.send("this is the ip " + req.ip);
})