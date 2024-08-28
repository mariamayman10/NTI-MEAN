import { Router } from "express";
import { applyProtection, signIn, signUp } from "../controllers/authenticationController";
import { signInValidator, signUpValidator } from "../utils/validation/authenticationValidator";
import { uploadUserImage, resizeUserImage } from './../controllers/userController';


const AuthenticationRoutes: Router = Router();

AuthenticationRoutes.use('/signup', uploadUserImage, resizeUserImage, signUpValidator,signUp);
AuthenticationRoutes.use('/signin', signInValidator,signIn);
// AuthenticationRoutes.use('/gg', applyProtection);


export default AuthenticationRoutes;