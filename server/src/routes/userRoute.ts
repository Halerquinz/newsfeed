import { Router } from "express";
import userController from "../controllers/userController";
import isAuth from "../middlewares/isAuth";
import { check, body } from "express-validator";

const router = Router();
// username, email, phone, firstname, lastname, profilePicture, coverPicture, livesin, about
router.get("/:userId", userController.getUser);
router.get("/users/getProfile", isAuth, userController.getUsers);
router.put(
  "/:userId",
  isAuth,
  [
    body("username")
      .isLength({ min: 6 })
      .withMessage("Minimum length of username should be 6")
      .trim(),
    check("email").isEmail().withMessage("Invalid Email").trim(),
    body(
      "phone",
      "Please enter phone has only number and length should be 10 or 11"
    )
      .isLength({ min: 10, max: 11 })
      .trim()
      .isInt(),
  ],
  userController.updateUser
);
router.put("/soft-delete/:userId", isAuth, userController.softDelete);
router.delete("/force-delete/:userId", isAuth, userController.forceDelete);

export default router;
