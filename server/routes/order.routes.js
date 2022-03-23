import express from "express";
import Response from "../modules/common/response.js";
import orderService from "../modules/orders/order.service.js";

const orderRouter = express.Router();

orderRouter.get("/:userID", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{
        let {userID} = req.params

        let {success, data, failReason, failCode} = await orderService.getUserOrders(userID);

        if(success){
            appResponseStatus= 200;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to fetch user orders", null)
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

export default orderRouter;