import { choiceCollection, poolCollection, voteCollection } from "../database/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";



export async function createChoice(req, res) {
    const choice = res.locals.choice;
    try {
        await choiceCollection.insertOne(choice);
        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function createVote(req, res) {
    const id = req.params.id;
    try {
        const vote = {
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            choiceId: id
        }
        const isChoice = await choiceCollection.findOne({ _id: new ObjectId(id) })
        if (!isChoice) {
            return res.sendStatus(404)
        }
        const searchPoolId = isChoice.pollId;

        const optionPool = await poolCollection.findOne({ _id: new ObjectId(searchPoolId) })
        const expiredPool = optionPool.expireAt;
        const isExpired = dayjs().isAfter(expiredPool, 'days');
        if (isExpired) {
            return res.status(403).send('Enquete expirada')
        }
        await voteCollection.insertOne(vote);
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.status(500).send(err.message);

    }

    






}