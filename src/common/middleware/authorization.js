import { exceptions, roleEnum } from "../index.js";

export const authorization = (acceptedRoles = []) => {
  return (req, res, next) => {
    let role = req.user.role;
    if (role == roleEnum.admin) next();
    if (!acceptedRoles.includes(role)) {
      exceptions.unauthorizedException(
        "you are not authorized to access this resource",
      );
    }
    next();
  };
};
