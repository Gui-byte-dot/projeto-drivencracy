import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();


const mongoClient = new MongoClient(process.env.MONGO_URI);

try{
    await mongoClient.connect();
    console.log("MongoDB Connected");
}catch(err){
    console.log(err);
}
const db = mongoClient.db("Drivencracy");
export const poolCollection = db.collection("pool");
export const choiceCollection = db.collection("choice");
export const voteCollection = db.collection("vote");
