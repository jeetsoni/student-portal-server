const cors = require('cors');
const express = require('express');
const connectDB = require('./db/mongoose');
const colors = require('colors');
const errorHandler = require('./middleware/error');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: '../config/dev.env' });

const app = express();

//Socket.io
var http = require('http').createServer(app);
const io = require('socket.io')(http);

//Body parser
app.use(express.json());

const port = process.env.PORT;

//Cokie parser
app.use(cookieParser());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const userRouter = require('./routers/user.js');
const postRouter = require('./routers/post');

//Connect to database
connectDB();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/post', postRouter);

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
