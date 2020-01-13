var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("vendingmachine");
  var myobj = [
    { id: 11, name: 'Coca Cola', price: 5, noRemaining: 2, img: 'coca-cola.jpg' },
    { id: 12, name: 'Pepsi Cola', price: 5, noRemaining: 3, img: 'pepsi.jpg' },
    { id: 13, name: 'Fanta', price: 5, noRemaining: 1, img: 'fanta.jpg' },
    { id: 14, name: 'Prigat', price: 5, noRemaining: 3, img: 'prigat.jpg' },
    { id: 15, name: 'Coca Cola', price: 5, noRemaining: 2, img: 'cola-cherry.jpg' },
    { id: 21, name: '7days', price: 3, noRemaining: 3, img: '7days.png' },
    { id: 22, name: 'Kit kat', price: 2, noRemaining: 1, img: 'kit-kat.jpg' },
    { id: 23, name: 'Mars', price: 2.5, noRemaining: 3, img: 'mars.jpg' },
    { id: 24, name: 'Snickers', price: 2.5, noRemaining: 3, img: 'snickers.jpeg' },
    { id: 25, name: 'Orbit', price: 2.5, noRemaining: 2, img: 'orbit.jpg' },
  ];
  dbo.collection("products").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number rows inserted: " + res.insertedCount);
    db.close();
  });
});
