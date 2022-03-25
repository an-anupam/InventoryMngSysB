import {mongoClient} from "../../utils/database/mongo.databse.js";
import {ObjectId} from "mongodb";

const addProduct = async (productDetails) => {
    try{
        let productObject = {
            brand: productDetails.brand,
            category: productDetails.category,
            gender: productDetails.gender,
            name: productDetails.name,
            price: productDetails.price,
            quantityAvailable: productDetails.quantityAvailable,
            quantityWarning: productDetails.quantityWarning
        }

        let insertStatus = await mongoClient.db().collection("products").insertOne(productObject);

        console.log(insertStatus)
        if (insertStatus.acknowledged){
            return {
                success: true,
                data: "Successfully added product details."
            }
        }else {
            return {
                success: false,
                failReason: "Failed to add product"
            }
        }
    }catch (error){
        console.log(error)
        return{
            success: false,
            failReason: "Internal service error"
        }
    }
}

const updateQuantity = async (productDetails) => {
    try{
        let query = {
            _id: ObjectId(productDetails._id)
        }

        let update = {
            $inc : {
                quantityAvailable: productDetails.updateQuantity
            },
            $set : {
                quantityWarning: productDetails.quantityWarning
            }
        }

        let productUpdateStatus = await mongoClient.db().collection("products").findOneAndUpdate(query, update);

        console.log(productUpdateStatus)
        if (productUpdateStatus.lastErrorObject &&
            productUpdateStatus.lastErrorObject.n === 1 &&
            productUpdateStatus.lastErrorObject.updatedExisting){
            return {
                success: true,
                data: "Successfully updated product details."
            }
        }else {
            return {
                success: false,
                failReason: "Failed to update product details."
            }
        }
    }catch (error){
        console.log(error)
        return{
            success: false,
            failReason: "Internal service error"
        }
    }
}

const listProducts = async () => {
    try{
        let listCursor = await mongoClient.db().collection("products").find({});

        let list = await listCursor.toArray()

            return {
                success: true,
                data: list
            }
    } catch (error){
        return{
            success: false,
            failReason: "Internal service error"
        }
    }
}

const removeProduct = async (productID) => {
    try{
        let query = {
            _id : ObjectId(productID)
        }

        let deleteStatus = await mongoClient.db().collection("products").findOneAndDelete(query);

        console.log(deleteStatus);

        if(deleteStatus && deleteStatus.lastErrorObject && deleteStatus.lastErrorObject.n === 1){
            return{
                success: true,
                data : "Successfully deleted product."
            }
        }else{
            return {
                success: false,
                failReason: "No product with this procudt id found."
            }
        }
    }catch (error){
        console.log(error)
        return {
            success: false,
            failReason : "Service error"
        }
    }
}

const productService = {
    addProduct,
    listProducts,
    updateQuantity,
    removeProduct
}

export default productService