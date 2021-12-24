const express = require('express');
const databaseConfiguration = require('./config/database');
const AdminRouter = require('./routes/systemadmin/authroute');
const app = express();
require('dotenv').config();
const port = process.env.PORT;


const mongoose = require('mongoose');

/**
 * model configuration
 */
//  const Systemadmin = require('./models/Systemadmin');
//  const Operator = require('./models/Oprator');
/** end of model configuration */

app.use(require('cookie-parser')());
app.use(express.json());
app.use('/admin', AdminRouter);

/**
 * database configuration
 */
databaseConfiguration()
/** end of database configuration */


app.get('/' , (req , res)=>{
   res.send('hello from simple server ');
})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port));