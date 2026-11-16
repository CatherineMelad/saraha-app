import jwt from "jsonwebtoken";
import configService from "../../config/config.service.js";
import { tokenTypeEnum, roleEnum } from "../index.js";

export const createTokens = ({
  payload = {},
  options = {},
  role = roleEnum.user,
}) => {
  let secrets = getRoleSecret(role);

  let accessToken = createToken(
    payload,
    { ...options, expiresIn: configService.JWT_ACCESS_EXP },
    secrets.access,
  );

  let refreshToken = createToken(
    payload,
    { ...options, expiresIn: configService.JWT_REFRESH_EXP },
    secrets.refresh,
  );

  return { accessToken, refreshToken };
};

const getSecret = ({
  tokenType = tokenTypeEnum.ACCESS,
  role = roleEnum.user,
}) => {
  let secrets = getRoleSecret(role);
  return tokenType == tokenTypeEnum.REFRESH ? secrets.refresh : secrets.access;
};

const getRoleSecret = (role) => {
  let secrets;
  switch (role) {
    case roleEnum.admin:
      secrets = {
        access: configService.JWT_ACCESS_ADMIN_SECRET,
        refresh: configService.JWT_REFRESH_ADMIN_SECRET,
      };
      break;

    default:
      secrets = {
        access: configService.JWT_ACCESS_USER_SECRET,
        refresh: configService.JWT_REFRESH_USER_SECRET,
      };
      break;
  }
  return secrets;
};

export const createToken = (payload = {}, options = {}, secret) => {
  return jwt.sign(payload, secret, options);
};

export const verifyToken = ({ token, tokenType = tokenTypeEnum.ACCESS }) => {
  let { aud } = jwt.decode(token);
  const secret = getSecret({ tokenType, role: aud[0] });
  return jwt.verify(token, secret);
};
