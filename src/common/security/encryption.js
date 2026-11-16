import crypto from "crypto";
import configService from "../../config/config.service.js";

let { ENC_KEY, ENC_IV_LEN, ENC_ALGO } = configService;
let key = Buffer.from(ENC_KEY, "hex");

export const encrypt = (plainText) => {
  const iv = crypto.randomBytes(ENC_IV_LEN);
  const cipher = crypto.createCipheriv(ENC_ALGO, key, iv);
  let result = cipher.update(plainText, "utf-8", "hex");
  result += cipher.final("hex");
  return `${iv.toString("hex")}::${result}`;
};

export const decrypt = (encryptedText) => {
  let [ivHex, encrypted] = encryptedText.split("::");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(ENC_ALGO, key, iv);
  let result = decipher.update(encrypted, "hex", "utf-8");
  result += decipher.final("utf-8");
  return result;
};
