import multer from "multer";
import { BadRequestException } from "../exceptions/error.exception.js";

export const upload = () => {
  const storage = multer.diskStorage({
    destination: "./uploads",

    filename: (req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb)=>{
    const allowedtype = ['image/png', 'image/jpg', 'image/avif']
    if (!allowedtype.includes(file.mimetype)) {
      return cb(BadRequestException({message: "Invalid formrat"}))
    }
    cb(null, true)
  }
  return multer({ storage, fileFilter });
};
