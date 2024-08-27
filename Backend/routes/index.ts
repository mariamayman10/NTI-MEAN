import { Application, Request, Response, NextFunction } from "express";
import CategoryRoutes from "./categoryRoutes";
import SubcategoryRoutes from "./subcategoryRoutes";
import ApiErrors from "../utils/apiErrors";
import { globalErrors } from "../middlewares/globalErrors";
import * as all from '../interfaces';
import ProductRoutes from "./productRoutes";

export const appRoutes = (app:Application):void => {
    app.use('/api/v1/category', CategoryRoutes);
    app.use('/api/v1/subcategory', SubcategoryRoutes);
    app.use('/api/v1/product', ProductRoutes);
    app.all('*', (req:Request, res:Response, next:NextFunction) => {
        next(new ApiErrors(`The route ${req.originalUrl} doesn't exist`, 400))
    });
    app.use(globalErrors);
}