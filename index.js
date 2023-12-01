const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const route = require('./Routes/route');
const cors = require('cors');
require("dotenv").config();
const dbCon = require('./Configure/configure');
const cloudConnect = require('./Configure/cloudinaryConfig');

app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cors());
app.use('/api/v7',route);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`APP IS RUNNING AT ${PORT}`)
})

dbCon();
cloudConnect();