var jwt = require('jsonwebtoken')
var express = require('express')
var router = express.Router()
var connection = require('../database/sql')
router.post('/', (req, res) => {
  const info = req.body
  // 生成token值：jwt
  const content = { name: info.userID }
  const privateKey = 'gmk'
  const token = jwt.sign(content, privateKey, { expiresIn: 60 * 60 * 24 })
  console.log('生成的token', token)
  let sql = `update ${info.auth} set token = '${token}' where userID = '${info.userID}' and password = '${info.password}'`
  connection.query(sql, (err) => {
    if (err) {
      throw err
    } else {
      sql = `select * from ${info.auth} where userID = '${info.userID}'`
      connection.query(sql, (err, result) => {
        if (err) {
          throw err
        } else {
          res.json(result)
          console.log('results', result)
        }
      })
    }
  })
})

module.exports = router
