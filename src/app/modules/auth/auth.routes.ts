import express from "express";
import { AuthControllers } from "./auth.controller";
import { auth, isAdmin } from "./auth.middleware";

const router = express.Router();

router.post("/login", AuthControllers.loginUser);
router.post("/logout", AuthControllers.logoutUser);
router.get("/me",auth, AuthControllers.getMe);

export const AuthRoutes = router;