import { userModel } from "../../database/models/index.js";


export const updateUser = async (user, data) => {
  const userData = await userModel.findByIdAndUpdate(user.id, data);
 return userData;
};
