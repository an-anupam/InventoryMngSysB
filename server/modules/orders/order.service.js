import {ObjectId} from "mongodb";
import {mongoClient} from "../../utils/database/mongo.databse.js";

const getUserOrders = async (userID) => {
    try{
        let query = {
            _id: ObjectId(userID)
        }

        let projection = {
            _id: 0,
            orders: 1
        }

        let user = await mongoClient.db().collection("users").findOne(query, {projection:  projection});

        if(user){
            return {
                success: true,
                data: user.orders ? user.orders : []
            }
        }else {
            return {
                success: false,
                failReason: "No user with this id found"
            }
        }
    }catch (error){
        console.log(error)
        return{
            success: false,
            failReason: "Uncaught"
        }
    }
}


const orderService = {
    getUserOrders
}

export default orderService