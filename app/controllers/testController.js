import db from "../../config/dbConfig.js";

export const getTestData = (req,res)=>{
    return res.json('Connected to the database'); 
}
