import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


const mongoClient = new MongoClient(process.env.MONGO_URI);
const db = mongoClient.db;

try{
    await mongoClient.connect();
    console.log("MongoDB Connected");
}catch(err){
    console.log(err);
}