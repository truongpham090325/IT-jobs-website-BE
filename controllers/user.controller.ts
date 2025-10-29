import { Request, Response } from "express";

export const registerPost = (req: Request, res: Response) => {
  console.log(req.body);

  res.json({
    code: "success",
    messgae: "Đăng ký tài khoản thành công",
  });
};
