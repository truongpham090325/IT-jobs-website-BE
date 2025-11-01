import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AccountUser from "../models/accounts-user.model";
import AccountCompany from "../models/accounts-company.model";

export const check = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.json({
        code: "error",
        message: "Token không hợp lệ!",
      });
      return;
    }

    var decoded = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`
    ) as jwt.JwtPayload;
    const { id, email } = decoded;

    // Tìm user
    const existAccountUser = await AccountUser.findOne({
      _id: id,
      email: email,
    });

    if (existAccountUser) {
      const infoUser = {
        id: existAccountUser.id,
        fullName: existAccountUser.fullName,
        email: existAccountUser.email,
      };

      res.json({
        code: "success",
        message: "Token hợp lệ!",
        infoUser: infoUser,
      });
      return;
    }

    // Tìm company
    const existAccountCompany = await AccountCompany.findOne({
      _id: id,
      email: email,
    });

    if (existAccountCompany) {
      const infoCompany = {
        id: existAccountCompany.id,
        companyName: existAccountCompany.companyName,
        email: existAccountCompany.email,
      };

      res.json({
        code: "success",
        message: "Token hợp lệ!",
        infoCompany: infoCompany,
      });
      return;
    }

    if (!existAccountCompany && !existAccountUser) {
      res.clearCookie("token");
      res.json({
        code: "error",
        message: "Token không hợp lệ!",
      });
    }
  } catch (error) {
    res.clearCookie("token");
    res.json({
      code: "error",
      message: "Token không hợp lệ!",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  res.json({
    code: "success",
    message: "Đã đăng xuất!",
  });
};
