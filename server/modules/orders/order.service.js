import {ObjectId} from "mongodb";
import {mongoClient} from "../../utils/database/mongo.databse.js";
import * as Console from "console";

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


const placeOrder = async (orderDetails, userID) => {
    try {

        await orderDetails.map(async (order) => {
                let query = {
                _id : ObjectId(order.cart)
            }

            let update = {
                $inc : {
                    quantityAvailable : -(order.quantity)
                }
            }

            let status = await mongoClient.db().collection("products").findOneAndUpdate(query, update)
        })

        let query = {
            _id : ObjectId(userID)
        }

        let update = {
            $push: {
                orders: orderDetails
            },
            $set : {
                cart : []
            }
        }

        let status = await mongoClient.db().collection("users").findOneAndUpdate(query, update)

        console.log(status)
        return{
            success: true,
            data: "Successfully placed your order"
        }
    }catch (error){
        return {
            success: true,
            failReason: "service error"
        }
    }
}

const orderService = {
    getUserOrders,
    placeOrder
}

export default orderService