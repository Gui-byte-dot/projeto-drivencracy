import { choiceCollection } from "../database/db.js";


export async function createChoice(req,res){
    const choice = res.locals.choice;
    try{
        await choiceCollection.insertOne(choice);
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}