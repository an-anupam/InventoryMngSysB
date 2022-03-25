import express from "express";
import Response from "../modules/common/response.js";
import productService from "../modules/products/products.service.js";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{
        let {productDetails} = req.body

        console.log(productDetails)

        let {success, data, failReason, failCode} = await productService.addProduct(productDetails);

        if(success){
            appResponseStatus= 201;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to add product..", null)
            return
        }
    }catch (error){
        appResponse.setError('', 'Internal server error', null);
        appResponseStatus = 500;
        return
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})

productsRouter.get("/", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{

        let {success, data, failReason, failCode} = await productService.listProducts();

        if(success){
            appResponseStatus= 200;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to fetch products.", null)
            return
        }
    }catch (error){
        appResponse.setError('', 'Internal server error', null);
        appResponseStatus = 500;
        return
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})

productsRouter.post("/update-quantity", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{

        let {productDetails} = req.body

        let {success, data, failReason, failCode} = await productService.updateQuantity(productDetails);

        if(success){
            appResponseStatus= 200;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to update products.", null)
            return
        }
    }catch (error){
        appResponse.setError('', 'Internal server error', null);
        appResponseStatus = 500;
        return
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})

productsRouter.delete("/:id", async (req, res) => {
    let appResponseStatus = 500
    let appResponse = new Response
    try{

        let {id} = req.params

        let {success, data, failReason, failCode} = await productService.removeProduct(id);

        if(success){
            appResponseStatus= 200;
            appResponse.setSuccess(data)
            return
        }else{
            appResponseStatus= 400;
            appResponse.setError(failCode? failCode: "", failReason? failReason: "Failed to delete products.", null)
            return
        }
    }catch (error){
        appResponse.setError('', 'Internal server error', null);
        appResponseStatus = 500;
        return
    }finally {
        res.status(appResponseStatus).json(appResponse);
    }
})

export default productsRouter;