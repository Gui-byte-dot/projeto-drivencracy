import { poolCollection } from "../database/db.js";

export async function createPool(req,res){
    const pool = res.locals.pool;

    try{
        await poolCollection.insertOne(pool);
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }

}