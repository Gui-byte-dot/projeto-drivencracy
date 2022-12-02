import dayjs from "dayjs";
import { poolSchema } from "../models/poll.model.js";


export function poolSchemaValidation(req,res,next){
    const {title, expireAt} = req.body;
    const pool = {
        title,
        expireAt: expireAt === '' ? dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm:ss') : expireAt,
    }
   
    if(title === ''){
        return res.sendStatus(422);
    }
    const{error} = poolSchema.validate(pool, {abortEarly: false});
    if (error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    

}
