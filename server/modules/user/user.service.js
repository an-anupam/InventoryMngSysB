import {mongoClient} from "../../utils/database/mongo.databse.js";
import {ObjectId} from "mongodb";

const getAdminByAdminID = async (userID) => {
    try{
        let user = mongoClient.db().collection("users").findOne({_id: ObjectId(userID)})

        return user
    }catch (err){
        return {
            success: false,
            failReason: "Uncaught"
        }
    }
}

const userService = {
    getAdminByAdminID
}

export default userService