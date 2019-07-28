const express = require('express')
var mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3000



var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portfolio_form_data'
})

connection.connect(function(err){
  if (err) throw err
  console.log('database connected')
})



app.use(bodyParser.urlencoded({extended: false}))

app.use("/css", express.static(__dirname + '/css'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/documents", express.static(__dirname + '/documents'));

app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname})
})

//SET THE ACTION AND METHOD IN FORM
app.post('/submit', function (req, res) {
  console.log(req.body)

      var sql = "insert into users values(null, '"+ req.body.name +"', '"+ req.body.email +"', '"+ req.body.message +"')"
      connection.query(sql, function (err) {
        if (err) throw err

      
         res.redirect("/");
      })

      connection.end()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))