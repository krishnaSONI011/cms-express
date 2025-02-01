const mysql = require('mysql2')

const db = mysql.createConnection({
    host:'localhost',
    port:'3307',
    user:'root',
    password:'1598',
    database:'cms-express'
})


module.exports = db