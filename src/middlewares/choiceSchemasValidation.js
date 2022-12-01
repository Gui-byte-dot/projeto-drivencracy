import dayjs from "dayjs";
import { choiceSchema } from "../models/choice.model.js";
import { ObjectId } from "mongodb";
import { poolCollection, choiceCollection } from "../database/db.js";

export async function choiceSchemaValidation(req,res,next){
    const {title,pollId} = req.body;
    const choice = {
        title,
        pollId
    }
    const searchPool = await poolCollection.findOne({_id: new ObjectId(choice.pollId)});
    if(!searchPool){
        return res.send("Enquete não existente").status(404);
    }
    const expiredPool = searchPool.expiredAt;
    const isExpired = dayjs().isAfter(expiredPool, 'days');
    if(isExpired) {
        return res.status(403).send('Enquete expirada')
    }
    const searchChoice = await choiceCollection.findOne({title:title});
    if(searchChoice){
        return res.sendStatus(409);
    }
    if(title === ''){
        return res.sendStatus(422);
    }

    const{error} = choiceSchema.validate(choice, {abortEarly: false});
    if (error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    res.locals.choice = choice;

    next();
   
}