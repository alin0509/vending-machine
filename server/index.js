var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3100

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/products', (request, response) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("vendingmachine");
    dbo.collection("products").find({}).toArray(function (err, result) {
      if (err) throw err;
      response.send(JSON.stringify(result));
      db.close();
    });
  })
})

app.post('/product', function (req, response) {
  const product = req.body.product;
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("vendingmachine");
    var myquery = { id: product.id };
    var newvalues = { $set: { noRemaining: product.noRemaining - 1 } };
    dbo.collection("products").updateOne(myquery, newvalues, (err, res) => {
      if (err) throw err;
      dbo.collection("products").find({}).toArray(function (err, result) {
        if (err) throw err;
        response.send(JSON.stringify(result));
        db.close();
      });
    });
  });
})

app.listen(port)

