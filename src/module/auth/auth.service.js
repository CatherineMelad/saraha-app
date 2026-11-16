import { userModel } from "../../database/models/index.js";
import {
  exceptions,
  myHash,
  myCompare,
  encrypt,
  createTokens,
} from "../../common/index.js";
import configService from "../../config/config.service.js";

export const signup = async (data) => {
  const user = await userModel.findOne({
    email: data.email,
  });
  if (user) exceptions.conflictException("user already exists");
  data.password = await myHash(data.password);
  data.phone = encrypt(data.phone);
  return await userModel.create(data);
};

export const login = async ({ email, password }) => {
  const user = await userModel.findOne({
    email,
  });
  if (!user) exceptions.notFoundException("user not found");
  let matchPass = await myCompare(password, user.password);
  if (!matchPass) exceptions.notFoundException("user not found");

  let tokens = createTokens({
    role: user.role,
    options: { subject: user.id, issuer: "catherine", audience: [user.role] },
  });

  return tokens;
};

export const rotateToken = async (user, payload) => {
  let accessIAT = payload.iat * 1000;

  let accessExpIn = configService.JWT_ACCESS_EXP * 1000;

  let accessExpAt = accessIAT + accessExpIn;

  let currentTime = Date.now();

  if (currentTime < accessExpAt) {
    exceptions.conflictException("access token still valid");
  }

  let { accessToken } = createTokens({
    options: { subject: user.id, issuer: "catherine" },
  });
  return { accessToken };
};
