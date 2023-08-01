const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbconnect');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const authRouter = require('./routes/authRoute');
const imageRouter = require('./routes/imageRoute');
const emailRouter = require('./routes/emailRoute');
const enquireRouter = require('./routes/enquireRoute');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

dbConnect();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'content-type', 'Accept', 'Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//     next();
// });
app.use(cors());

app.use("/user", authRouter);
app.use("/image", imageRouter);
app.use("/email", emailRouter);
app.use("/request", enquireRouter);


app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log('server is running at PORT', PORT);
});
