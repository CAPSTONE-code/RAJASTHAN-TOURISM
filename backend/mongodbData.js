require('dotenv').config()
const {MongoClient}=require('mongodb')
const uri=`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.CLUSTER_NAME}.ethozic.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`;
const client=new MongoClient(uri)
const dbName='capstone_db';



async function getdata(collectionName,query={}){
    await client.connect();
    console.log("connected sucessfully");
    const db=client.db(dbName);
    const collection =db.collection(collectionName);
    const findResult= await collection.aggregate([
        { $project: { _id: 0 } }
      ]).toArray();
    //const findResult = await collection.find(query).toArray();
    return new Promise((res,rej)=>{res(JSON.parse(JSON.stringify(findResult)))})
    client.close()
}


async function randomData(collectionName) {
  await client.connect();
  console.log("connected sucessfully");
  const db=client.db(dbName);
  const collection =db.collection(collectionName);
  const randomRecords = await collection.aggregate([{ $sample: { size: 10 } } ]).toArray();
  return new Promise((res,rej)=>{res(JSON.parse(JSON.stringify(randomRecords)))})
  client.close()
}

async function addData(collectionName) {
  try {
    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB!");

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const newDocument = {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
      createdAt: new Date()
    };

    const result = await collection.insertOne(newDocument);

    console.log(`New document added with _id: ${result.insertedId}`);
  } catch (error) {
    console.error("Error adding document:", error);
  } finally {
    await client.close();
  }
}


exports.randomData=randomData;
exports.getdata=getdata;

