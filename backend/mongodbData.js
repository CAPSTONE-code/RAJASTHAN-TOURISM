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
}

exports.getdata=getdata;

