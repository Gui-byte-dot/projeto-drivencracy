import { choiceCollection, poolCollection, voteCollection} from "../database/db.js";
import {ObjectId} from 'mongodb';

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
export async function findPool(req,res){
    try{
        const findpool = await poolCollection.find().toArray();
        res.send(findpool);
    }catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function findPoolId(req,res){
    const id = req.params.id;

    try {
      const listChoice = await choiceCollection.find({ pollId: id }).toArray();
  
      if(listChoice.length === 0) {
        return res.status(404).send('Enquete não encontrada');
      }
  
      res.send(listChoice);
    } catch(error) {
      console.log(error);
      res.status(500).send(error.message);
    }
}


export async function findResult(req,res){
    const id = req.params.id;
    try{
        const listChoice = await choiceCollection.find({ pollId: id }).toArray();
        if(listChoice.length === 0) {
            return res.status(404).send('Enquete não encontrada');
        }
        const votes = await voteCollection.find().toArray();
        console.log(votes);

        function findOcc(arr, key){
            let arr2 = [];
            arr.forEach((x)=>{
               if(arr2.some((val)=>{ return val[key] == x[key] })){
                 arr2.forEach((k)=>{
                   if(k[key] === x[key]){ 
                     k["occurrence"]++
                   }
                })
               }else{
                 let a = {}
                 a[key] = x[key]
                 a["occurrence"] = 1
                 arr2.push(a);
               }
            }) 
            return arr2
          }   
          let key = "choiceId"
          const ocorrences = (findOcc(votes, key));
          console.log(ocorrences);

          const ocorrencias = (ocorrences.map(recipe => recipe.occurrence));
          const maiorVoto = (Math.max(...ocorrencias));
          console.log(maiorVoto);

          const filtro = ocorrences.filter(x => x.occurrence === maiorVoto);
          const filtroEscolhido = filtro[0].choiceId;
        

          const findVote = await choiceCollection.findOne({_id:new ObjectId(filtroEscolhido)});
          const findVotePoolId = findVote.pollId;
          const findVotePoolTitle = findVote.title;
          

          let poolFindId = await poolCollection.findOne({_id:new ObjectId(findVotePoolId)});
         
          const result1 = {
            result:{
              title:findVotePoolTitle,
              votes:maiorVoto
            }
          }
          let obj = Object.assign({}, poolFindId, result1);

          obj._id = findVotePoolId;
          console.log(obj)
          
        res.send(obj).status(201);
    }catch(error) {
        console.log(error);
        res.status(500).send(error.message);
    }

}

