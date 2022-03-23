import {mongoClient} from "../../utils/database/mongo.databse.js";
import {ObjectId} from "mongodb";

const getAdminByAdminID = async (userID) => {
    try{
        let user = await mongoClient.db().collection("users").findOne({_id: ObjectId(userID)})

        return user
    }catch (err){
        return {
            success: false,
            failReason: "Uncaught"
        }
    }
}

const createUser = async (userDetails) => {
    try{
        let userObject =  {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            emailID: userDetails.emailID,
            password: userDetails.password
        }

        let insertStatus = await mongoClient.db().collection("users").insertOne(userObject);

        if(insertStatus.acknowledged){
            return {
                success: true,
                data: "successfully added new user."
            }
        }else {
            return {
                success: false,
                failReason: "Failed to add new user"
            }
        }
    }catch (error){
        if(error.code === 11000){
            return {
                success : false,
                failReason: "emailID is already taken",
                failCode: "111"
            }
        }
        return{
            success: false,
            failReason: "service error"
        }
    }
}

const addUserAddress = async (userID, userAddress) => {
    try{
        let addressObject =  {
            line1 : userAddress.line1,
            line2: userAddress.line2,
            city: userAddress.city,
            state: userAddress.state,
            country: userAddress.country,
            pin: userAddress.pin
        }

        let query = {
            _id: ObjectId(userID)
        }

        let update = {
            $set : {
                address: addressObject
            }
        }

        let updateStatus = await mongoClient.db().collection("users").findOneAndUpdate(query, update);

        if(updateStatus.lastErrorObject &&
            updateStatus.lastErrorObject.n === 1 &&
            updateStatus.lastErrorObject.updatedExisting){
            return {
                success: true,
                data: "successfully added user's address."
            }
        }else {
            return {
                success: false,
                failReason: "Failed to add user's address"
            }
        }
    }catch (error){
        console.log(error)
        return{
            success: false,
            failReason: "service error"
        }
    }
}

const userService = {
    getAdminByAdminID,
    createUser,
    addUserAddress
}

export default userService