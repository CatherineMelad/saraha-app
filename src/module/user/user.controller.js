import { Router } from "express";
import * as us from "./user.service.js";
import {
  auth,
  response,
  tokenTypeEnum,
  authorization,
  roleEnum,
} from "../../common/index.js";

export const userRouter = Router();

// user profile api
userRouter.get(
  "/profile",
  auth({ tokenType: tokenTypeEnum.ACCESS }),
  async (req, res, next) => {
    try {
      response({
        res,
        data: req.user,
        message: "User profile fetched successfully",
      });
    } catch (error) {
      response({
        res,
        status: 400,
        message: error.message || "Internal server error",
      });
    }
  },
);

// admin profile api
userRouter.get(
  "/admin-profile",
  auth({ tokenType: tokenTypeEnum.ACCESS }),
  authorization([roleEnum.admin]),
  async (req, res, next) => {
    try {
      response({
        res,
        data: req.user,
        message: "Admin profile fetched successfully",
      });
    } catch (error) {
      response({
        res,
        status: 400,
        message: error.message || "Internal server error",
      });
    }
  },
);

// update user profile api
userRouter.put(
  "/update-user",
  auth({ tokenType: tokenTypeEnum.ACCESS }),
  async (req, res, next) => {
    try {
      const user = await us.updateUser(req.user, req.body);
      response({
        res,
        data: user,
        message: "User profile updated successfully",
      });
    } catch (error) {
      response({
        res,
        status: 400,
        message: error.message || "Internal server error",
      });
    }
  },
);
