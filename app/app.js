const express = require('express');
const app = express();
const router = request ('./routes/gymRouter')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/gym',router)

module.exports=app