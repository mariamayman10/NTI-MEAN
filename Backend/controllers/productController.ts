import Product from "../interfaces/product";
import ProductModel from "../schemas/productSchema";
import {Response, Request, NextFunction} from 'express'
import { createDocument, deleteDocument, getDocument, getDocuments, updateDocument } from "./controllerInterface";
import FilterData from "../interfaces/filterData";
import multer from 'multer';
import ApiErrors from "../utils/apiErrors";

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        const fileName = `product-${Date.now()}-cover.jpg`;
        cb(null, fileName);
    }
});
const multerFilter = (req: Request, file:any, cb: any) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new ApiErrors('File is not an image', 400), false);
    }
}
export const upload = multer({ storage: multerStorage, fileFilter: multerFilter })

export const createProduct = createDocument<Product>(ProductModel);

export const updateProduct = updateDocument<Product>(ProductModel);

export const deleteProduct = deleteDocument<Product>(ProductModel);

export const getProduct = getDocument<Product>(ProductModel);

export const getProducts = getDocuments<Product>(ProductModel, 'product');

export const filterData = (req:Request, res:Response, next: NextFunction) => {
    let filterDataObj:FilterData = {};
    if(req.params.subcategoryId){
        filterDataObj.subcategory = req.params.subcategoryId;
    }
    req.filterData = filterDataObj;
    next();
}