const db = require('../config/db')

function userInsert(data,tablename){
  
    const query =  `INSERT INTO ${tablename} VALUES (?,?,?)`
    const result = db.query(query,data)
    if(result){
        return 'data inserted'
    }
    else return 'somthing went wrong';
}
module.exports = userInsert