import { Router } from "express";
import { uploadUserImage, changeSignedInUserPassword, changeUserPassword, createUser, deleteUser, getSignInUser, getUser, getUsers, resizeUserImage, updateSignedInUser, updateUser, addAddress, removeAddress, getAddresses, getAddress } from "../controllers/userController";
import { addAddressValidator, changePasswordValidator, changeSignedInPasswordValidator, createUserValidator, deleteUserValidator, getUserValidator, removeAddressValidator, updateSignedInUserValidator, updateUserValidator } from "../utils/validation/userValidator";
import { allowedTo, applyProtection, checkActive } from "../controllers/authenticationController";


const UserRoutes: Router = Router();

// apply "applyProtection" and "checkActive" to all routes
UserRoutes.use(applyProtection, checkActive);

UserRoutes.get('/me', getSignInUser, getUser);
UserRoutes.put('/updateMe', uploadUserImage, resizeUserImage , updateSignedInUserValidator, updateSignedInUser);
UserRoutes.put('/changeMyPassword', changeSignedInPasswordValidator, changeSignedInUserPassword);
UserRoutes.delete('/deleteMe', allowedTo('user'), getSignInUser, deleteUser);

UserRoutes.use(allowedTo('user'));
UserRoutes.post('/address', addAddressValidator, addAddress);
UserRoutes.delete('/address', removeAddressValidator, removeAddress);
UserRoutes.get('/address', getAddresses);
UserRoutes.get('/address/:id', getAddress);


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