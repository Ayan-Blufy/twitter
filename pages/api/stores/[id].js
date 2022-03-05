import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const {
        method,
        query: { id }
    
    } = req;

    const { db } = await connectToDatabase();



    if (method === "GET") {
        try {
            const posts = await db
                .collection("posts")
                .findOne({ _id: new ObjectId(id) })

            // console.log(posts)
            res.status(200).send(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    if (method === "DELETE") {
        try {
            await db.collection("comments").deleteOne({ _id: new ObjectId(id) });
            res.status(200).json({ message: "The post has been deleted!!" });
        } catch (error) {
            res.status(500).json(error);
        }
    }



}
