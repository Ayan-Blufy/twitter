import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const {
        method,
        body,
        query: { id },
    } = req;

    const { db } = await connectToDatabase();



    if (method === "PATCH") {
            console.log(body.likes);
        try {
            await db.collection("posts").findOneandUpdate({ _id: new ObjectId(id) },{$set:{likes:body.likes}});
            res.status(200).json({ message: "The post has been deleted!!" });
        } catch (error) {
            res.status(500).json(error);
        }
    }


}
