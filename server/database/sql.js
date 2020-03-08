var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '175787',
  database: 'graduate'
})
connection.connect((err) => {
  if (err) {
    console.log('error:', err)
  } else {
    console.log('connect successful')
  }
})
module.exports = connection
