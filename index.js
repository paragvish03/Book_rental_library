const express = require('express')
const app = express();
const {sequelize} = require('./models')
const {bookRouter} = require('./routes/book_routes')

app.use(express.json())
app.use(bookRouter)

app.get('/',(req,res)=>{
res.status(200).send({mssge:"open in home browser"})
})

app.listen(4300,async(req,res)=>{
    console.log('server is running')
    await sequelize.sync({force:false}).then(()=>console.log("table is created")).catch((err)=>console.log(err))

})
