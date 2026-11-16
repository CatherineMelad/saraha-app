import { Router } from "express";
import * as as from "./auth.service.js";
import { auth, response, tokenTypeEnum } from "../../common/index.js";

export const authRouter = Router();

// signup api
authRouter.post("/signup", async (req, res, next) => {
  try {
    const user = await as.signup(req.body);
    return response({
      res,
      data: user,
      status: 201,
      message: "User registered successfully",
    });
  } catch (error) {
    return response({
      res,
      status: 400,
      message: error.message || "Internal server error",
    });
  }
});

// login api
authRouter.post("/login", async (req, res, next) => {
  try {
    const user = await as.login(req.body);
    return response({
      res,
      data: user,
      message: "User logged in successfully",
    });
  } catch (error) {
    return response({
      res,
      status: 400,
      message: error.message || "Internal server error",
    });
  }
});

// rotate token api
authRouter.post("/rotate-token", auth({tokenType: tokenTypeEnum.REFRESH}), async (req, res, next) => {
  try {
    const tokens = await as.rotateToken(req.user, req.payload);
    return response({
      res,
      data: tokens,
      message: "Token rotated successfully",
    });
  } catch (error) {
    return response({
      res,
      status: 400,
      message: error.message || "Internal server error",
    });
  }
})

