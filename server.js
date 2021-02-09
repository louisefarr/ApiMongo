const express = require('express');
const app = express();
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'game-of-thrones';
let db;

MongoClient.connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true } ,(err, client) => {
  if (err) 
  {return console.log(err);}

  // Storing a reference to the database so you can use it later
  else {
  db = client.db(dbName);
  console.log(`Connected MongoDB: ${url}`);
  console.log(`Database: ${dbName}`);}
});

app.use(express.json());

app.get('/', async (req,res) => {
  try {
      const docs = await db.collection('characters').find({}).toArray()
      let data = JSON.stringify(docs);
      fs.writeFileSync("characters2.json",data);

      res.status(200).json(docs);

      /*fs.readFile(__dirname + "/index.html")
        .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);})*/

  }
  catch (err) {
      console.log(err)
      throw err
  }
});

/*

app.get('/characters/:id', async (req,res) => {
  const id = parseInt(req.params.id)
  try {
      const docs = await db.collection('characters').findOne({id})
      res.status(200).json(docs)
  } catch (err) {
      console.log(err)
      throw err
  }
})


app.post('/characters', async (req,res) => {
  try {
      const parkingData = req.body
      const parking = await db.collection('characters').insertOne(parkingData)
      res.status(200).json(parking)
  } catch (err) {
      console.log(err)
      throw err
  }
  
})

app.put('/characters/:id', async (req,res) => {
  try {
      const id = parseInt(req.params.id)
      const replacementParking = req.body
      const parking = await db.collection('characters').replaceOne({id},replacementParking)
      res.status(200).json(parking)
  } catch (err) {
      console.log(err)
      throw err
  }
})

app.patch('/characters/:id', async (req,res) => {
  try {
      const id = parseInt(req.params.id)
      const replacementParking = req.body
      const parking = await db.collection('characters').updateOne({id}, {$set: replacementParking}, {upsert:true})
      res.status(200).json(parking)
  } catch (err) {
      console.log(err)
      throw err
  } 
})

app.delete('/characters/:id', async (req,res) => {
  try {
      const id = parseInt(req.params.id)
      const parking = await db.collection('characters').deleteOne({id})
      res.status(200).json(parking)
  } catch (err) {
      console.log(err)
      throw err
  } 
})*/

app.listen(8080, () => {
  console.log("Serveur à l'écoute")
})




