import { Router } from "express";
import * as companyController from "../controllers/company.controller";
import * as companyValidate from "../validates/company.validate";
import multer from "multer";
import { storage } from "../helpers/clouldinary.helper";
import * as authMiddleware from "../middlewares/auth.middleware";

const router = Router();

const upload = multer({ storage: storage });

router.post(
  "/register",
  companyValidate.registerPost,
  companyController.registerPost
);

router.post("/login", companyValidate.loginPost, companyController.loginPost);

router.patch(
  "/profile",
  authMiddleware.verifyTokenCompany,
  companyValidate.profilePatch,
  upload.single("logo"),
  companyController.profilePatch
);

router.post(
  "/job/create",
  authMiddleware.verifyTokenCompany,
  companyValidate.createJobPost,
  upload.array("images", 8),
  companyController.createJobPost
);

export default router;
