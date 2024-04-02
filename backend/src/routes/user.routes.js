import {Router} from "express";
import { registerUser, loginUser, logoutUser, getCurrentUser, updateUser, addWishlist, getWishList } from "../controllers/user.controllers.js";
import {verifyJWT} from "../middlewares/auth.middlewares.js"
import {upload} from "../middlewares/multer.middlewares.js"

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-profile").patch(verifyJWT, upload.single("avatar"),updateUser)
router.route("/add-wishlist/:id").patch(verifyJWT, addWishlist)
router.route("/get-wishlist").get(verifyJWT, getWishList)

export default router;