const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;



app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://sobujrana43997:iXlabi0ScEEvlNq2@cluster0.udy85xl.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
    // const database = client.db("insertDB");
    // const haiku = database.collection("haiku");

      const brandsCollection = client.db('brandsDB').collection('brands')

      app.post('/brands',async(req,res) => {
        const car = req.body;
        console.log(car)
        const result = await brandsCollection.insertOne(car)
        res.send(result)
      })

      app.get('/brands',async(req,res) =>{
        const result =await brandsCollection.find().toArray()
        res.send(result)
      })


    app.get('/brands/:name',async(req,res) =>{
       const brand = req.params.name;
       const query = {brand:brand};
        const result =await brandsCollection.find(query).toArray()
        res.send(result)
      })

    app.get('/brands/:id',async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await brandsCollection.findOne(query)
      res.send(result)
    })

          
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  
  }
}
run().catch(console.dir);

app.get('/',(req,res) =>{
    res.send('Mercedes-car-dealerships server is running.............. ')
})


app.listen(port,() =>{
    console.log(`running port:${port}`)
})