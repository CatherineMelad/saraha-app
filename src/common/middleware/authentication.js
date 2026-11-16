import { exceptions, verifyToken, tokenTypeEnum } from "../index.js";
import { userModel } from "../../database/models/index.js";

export const auth = ({ tokenType = tokenTypeEnum.ACCESS }) => {
  return async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
      exceptions.unauthorizedException("token not found");
    }
    let payload = verifyToken({ token, tokenType });
    req.user = await userModel.findById(payload.sub);
    req.payload = payload;
    next();
  };
};
