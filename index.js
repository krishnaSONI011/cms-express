const express = require('express')
const path = require('path')
const app = express()
const dashboardRoutes = require('./routes/dashboard')

app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000,()=>{
    console.log('server start')
})

app.get('/',(req,res)=>{
    res.render('index')
})
app.use('/dashboard',dashboardRoutes)

