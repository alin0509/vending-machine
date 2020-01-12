
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const express = require('express')
const app = express()
const port = 3100

app.get('/', (request, response) => {
    response.send('Hello from Express!')
})

app.get('/products', (request, response) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("vendingmachine");
        dbo.collection("products").find({}).toArray(function (err, result) {
            if (err) throw err;
            response.send(JSON.stringify(result));
            console.log(result)
            db.close();
        });
    })
})
app.listen(port)

