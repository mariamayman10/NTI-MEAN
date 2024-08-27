import { Router } from "express";
import { createProduct, deleteProduct, filterData, getProduct, getProducts, updateProduct, upload } from "../controllers/productController";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validation/productValidator";

const ProductRoutes: Router = Router({mergeParams: true});

ProductRoutes.route('/')
    .get(filterData, getProducts)
    .post(upload.single('cover'), createProductValidator,createProduct);
ProductRoutes.route('/:id')
    .get(getProductValidator, getProduct)
    .delete(deleteProductValidator, deleteProduct)
    .put(updateProductValidator ,updateProduct);

export default ProductRoutes;