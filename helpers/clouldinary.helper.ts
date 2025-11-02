import { v2 as cloudinary } from "cloudinary";
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dwfupuebl",
  api_key: "991327967523154",
  api_secret: "RjoavfClqIZJt5QRNAEes35bqMM",
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});
