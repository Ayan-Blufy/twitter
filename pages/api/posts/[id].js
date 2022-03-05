import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const {
        method,
        body,
        query: { id },
    } = req;

    const { db } = await connectToDatabase();
    const {likes}=body;
    if (method === "PATCH") {
        
        try {
          await db.collection("posts").findOneAndUpdate({ _id: new ObjectId(id) },{$set :{ likes:likes }} );
     
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    if (method === "DELETE") {
        try {
            await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
            res.status(200).json({ message: "The post has been deleted!!" });
        } catch (error) {
            res.status(500).json(error);
        }
    }


  


}
