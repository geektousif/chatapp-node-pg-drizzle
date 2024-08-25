import { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  searchUser,
} from "../../controllers/user.controller";
import validateSchema from "../../middlewares/validateSchema.middleware";
import { loginUserDto, registerUserDto } from "../../dto/user.dto";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateSchema(registerUserDto), registerUser);
router.post("/login", validateSchema(loginUserDto), loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getUser);
// router.get("/search", authMiddleware, searchUser);

export default router;
