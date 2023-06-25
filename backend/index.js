const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { userRouter } = require('./routers/userRouter.js');
const { searchRouter } = require('./routers/searchRouter.js');

const app = express();
const port = 5000;

mongoose.connect(
  'mongodb+srv://Kursach:Kursach@cluster0.h9kve7x.mongodb.net/mytable?retryWrites=true&w=majority'
);
mongoose.connection
  .once('open', () => {
    console.log('Connection to database successfully');
  })
  .on('error', (error) => {
    console.log('Connection to database failed', error);
  });

app.use(
	cors({
		credentials: true,
		origin: [
      'http://localhost:3000/login',
      'http://localhost:3000/',
      'http://localhost:3000/profile',
      'http://localhost:3000'
    ],
	})
);
app.use(cookieParser());
app.use(express.json());

app.use('/user', userRouter);
app.use('/', searchRouter);

app.listen(port, () => {
	console.log(`server running on port: ${port}`);
});
