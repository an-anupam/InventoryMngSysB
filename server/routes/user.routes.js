import express, {response} from "express";
import Response from "../modules/common/response.js";
import userService from "../modules/user/user.service.js";

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{
        let {userObject} = req.body;

        let {success, data, failReason, failCode} = await userService.createUser(userObject);

        if(success){
            appResponseStatus= 201;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to add new user", null)
            return
        }
    }catch (error){
        appResponse.setError('CL-GR-RE-3-UNCAUGHT', 'Internal server error', null);
        return
        appResponseStatus = 500;
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})

userRouter.post("/set-address/:userID", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{
        let {userID} = req.params
        let {addressObject} = req.body;

        let {success, data, failReason, failCode} = await userService.addUserAddress(userID,addressObject);

        if(success){
            appResponseStatus= 201;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to add address", null)
            return
        }
    }catch (error){
        appResponse.setError('CL-GR-RE-3-UNCAUGHT', 'Internal server error', null);
        return
        appResponseStatus = 500;
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})

userRouter.get("/cart/:userID/:productID", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{
        let {userID, productID} = req.params
        console.log(userID, productID)
        let {success, data, failReason, failCode} = await userService.addProductToUserCart(userID, productID);

        if(success){
            appResponseStatus= 201;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to add product to cart", null)
            return
        }
    }catch (error){
        appResponse.setError('CL-GR-RE-3-UNCAUGHT', 'Internal server error', null);
        return
        appResponseStatus = 500;
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})


userRouter.delete("/cart/:userID/:productID", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{
        let {userID, productID} = req.params
        console.log(userID, productID)
        let {success, data, failReason, failCode} = await userService.removeProductFromUserCart(userID, productID);

        if(success){
            appResponseStatus= 201;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to remove product from cart", null)
            return
        }
    }catch (error){
        appResponse.setError('CL-GR-RE-3-UNCAUGHT', 'Internal server error', null);
        return
        appResponseStatus = 500;
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})

userRouter.get("/cart/:userID", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{
        let {userID} = req.params
        let {success, data, failReason, failCode} = await userService.getUserCart(userID);

        if(success){
            appResponseStatus= 200;
            console.log(data)
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to add product to cart", null)
            return
        }
    }catch (error){
        appResponse.setError('CL-GR-RE-3-UNCAUGHT', 'Internal server error', null);
        return
        appResponseStatus = 500;
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})

userRouter.get("/cart-with-products/:userID", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{
        let {userID} = req.params
        let {success, data, failReason, failCode} = await userService.getUserCartWithProducts(userID);

        if(success){
            appResponseStatus= 200;
            console.log(data)
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to add product to cart", null)
            return
        }
    }catch (error){
        appResponse.setError('CL-GR-RE-3-UNCAUGHT', 'Internal server error', null);
        return
        appResponseStatus = 500;
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})

userRouter.get("/:userID", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{
        let {userID} = req.params

        let {success, data, failReason, failCode} = await userService.getUserByUserID(userID);

        if(success){
            appResponseStatus= 200;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to fetch user details", null)
            return
        }
    }catch (error){
        appResponse.setError('CL-GR-RE-3-UNCAUGHT', 'Internal server error', null);
        return
        appResponseStatus = 500;
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})


export default userRouter;