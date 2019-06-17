const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { allowCrossDomain } = require('./middlewares/cors.middleware');
require('dotenv/config');


const userRouter = require('./routers/user.router');

const PORT = process.env.PORT || 3000;
const app = express();

//connect database
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_PATH}`,{
    useCreateIndex : true,
    useNewUrlParser: true,
}, (error) => {
    if(error) throw error;
    console.log(`Database is connected!`);
});

//config middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(allowCrossDomain);
//mountRouters

app.use('/', userRouter);

app.listen(PORT, (error)=>{
    if(error) throw error;
    console.log(`Server is running on PORT=${PORT}`);
})