import { Request, Response } from "express";
import AccountUser from "../model/accounts-user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerPost = async (req: Request, res: Response) => {
  const existAccount = await AccountUser.findOne({
    email: req.body.email,
  });

  if (existAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!",
    });
    return;
  }

  //Mã hóa mật khẩu
  const salt = await bcrypt.genSalt(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  const newAccount = new AccountUser(req.body);
  await newAccount.save();

  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công!",
  });
};

export const loginPost = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existAccount = await AccountUser.findOne({
    email: email,
  });

  if (!existAccount) {
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    `${existAccount.password}`
  );

  if (!isPasswordValid) {
    res.json({
      code: "error",
      message: "Mật khẩu không đúng!",
    });
    return;
  }

  const token = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email,
    },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // 1 ngày
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // https để true, http để fasle
    sameSite: "lax", // Cho phép gửi cookie giữa các tên miền
  });

  res.json({
    code: "success",
    message: "Đăng nhập thành công!",
  });
};
