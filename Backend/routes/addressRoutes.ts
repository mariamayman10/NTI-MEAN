import { Router } from "express";
import { applyProtection, allowedTo, checkActive } from "../controllers/authenticationController";
import { addAddress, removeAddress } from "../controllers/addressController";

const AddressRoutes: Router = Router();

AddressRoutes.use(applyProtection, checkActive, allowedTo('user'))

AddressRoutes.route('/')
    .post(addAddress)
AddressRoutes.route('/:addressId')
    .delete(removeAddress)
export default AddressRoutes;