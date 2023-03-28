import { diskStorage, Options } from "multer";
import { resolve } from "path";
import { Request } from "express";

export const multerConfig = {
  dest: resolve(__dirname, "..", "..", "..uploads"),
  storage: diskStorage({
    destination: (request: Request, file: any, callback: Function) => {
      callback(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (request: Request, file: any, callback: Function) => {
      const filename = new Date().getTime().toString() + ".png";
      callback(null, filename);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 10,
  },
  fileFilter: (request: Request, file: any, callback: Function) => {
    const formats = ["image/jpeg", "image/jpg", "image/png"];
    if (formats.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Formats not accepted"));
    }
  },
} as Options;
