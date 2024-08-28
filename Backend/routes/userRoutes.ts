import { Router } from "express";
import { changeUserPassword, createUser, deleteUser, getUser, getUsers, resizeUserImage, updateUser } from "../controllers/userController";
import { changePasswordValidation, createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from "../utils/validation/userValidator";
import { uploadUserImage } from './../controllers/userController';
import { allowedTo, applyProtection, checkActive } from "../controllers/authenticationController";


const UserRoutes: Router = Router();
UserRoutes.use(applyProtection, checkActive, allowedTo('manager'))
UserRoutes.put('/:id/changePassword', changePasswordValidation, changeUserPassword);
UserRoutes.route('/')
    .get(getUsers)
    .post(applyProtection, uploadUserImage, resizeUserImage, createUserValidator,createUser);
UserRoutes.route('/:id')
    .get(getUserValidator, getUser)
    .delete(applyProtection, deleteUserValidator, deleteUser)
    .put(applyProtection, uploadUserImage, resizeUserImage, updateUserValidator ,updateUser);

export default UserRoutes;