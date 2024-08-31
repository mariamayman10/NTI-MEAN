import { Router } from "express";
import { uploadUserImage, changeSignedInUserPassword, changeUserPassword, createUser, deleteUser, getSignInUser, getUser, getUsers, resizeUserImage, updateSignedInUser, updateUser } from "../controllers/userController";
import { changePasswordValidator, changeSignedInPasswordValidator, createUserValidator, deleteUserValidator, getUserValidator, updateSignedInUserValidator, updateUserValidator } from "../utils/validation/userValidator";
import { allowedTo, applyProtection, checkActive } from "../controllers/authenticationController";


const UserRoutes: Router = Router();

// apply "applyProtection" and "checkActive" to all routes
UserRoutes.use(applyProtection, checkActive);

UserRoutes.get('/me', getSignInUser, getUser);
UserRoutes.put('/updateMe', updateSignedInUserValidator, updateSignedInUser);
UserRoutes.put('/changeMyPassword', changeSignedInPasswordValidator, changeSignedInUserPassword);
UserRoutes.delete('/deleteMe', allowedTo('user'), getSignInUser, deleteUser);


// Routes allowed to manager only
UserRoutes.use(allowedTo('manager'));
UserRoutes.put('/:userId/changePassword', changePasswordValidator, changeUserPassword);
UserRoutes.route('/')
    .get(getUsers)
    .post(uploadUserImage, resizeUserImage, createUserValidator, createUser);
UserRoutes.route('/:id')
    .get(getUserValidator, getUser)
    .delete(deleteUserValidator, deleteUser)
    .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser);

export default UserRoutes;