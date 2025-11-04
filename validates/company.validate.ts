import { NextFunction, Request, Response } from "express";
import Joi from "Joi";

export const registerPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    companyName: Joi.string().required().min(5).max(200).messages({
      "string.empty": "Vui lòng nhập tên công ty!",
      "string.max": "Tên công ty không được vượt quá 200 ký tự!",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "Vui lòng nhập email của bạn!",
      "string.email": "Email không đúng định dạng!",
    }),
    password: Joi.string()
      .required()
      .min(8)
      .custom((value, helpers) => {
        if (!/[A-Z]/.test(value)) {
          return helpers.error("password.uppercase");
        }
        if (!/[A-Z]/.test(value)) {
          return helpers.error("password.lowercase");
        }
        if (!/\d/.test(value)) {
          return helpers.error("password.number");
        }
        if (!/[@$!%*?&]/.test(value)) {
          return helpers.error("password.special");
        }
        return value;
      })
      .messages({
        "string.empty": "Vui lòng nhập mật khẩu!",
        "string.min": "Mật khẩu phải chứa ít nhất 8 ký tự!",
        "password.uppercase": "Mật khẩu phải chứa ít nhất một chữ cái in hoa!",
        "password.lowercase": "Mật khẩu phải chứa ít nhất một chữ cái thường!",
        "password.number": "Mật khẩu phải chứa ít nhất một chữ số!",
        "password.special": "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!",
      }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage,
    });
    return;
  }

  next();
};

export const loginPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": "Vui lòng nhập email của bạn!",
      "string.email": "Email không đúng định dạng!",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Vui lòng nhập mật khẩu!",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage,
    });
    return;
  }

  next();
};

export const profilePatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": "Vui lòng nhập email của bạn!",
      "string.email": "Email không đúng định dạng!",
    }),
    companyName: Joi.string().required().messages({
      "string.empty": "Vui lòng nhập tên công ty!",
    }),
    logo: Joi.allow(""),
    city: Joi.allow(""),
    address: Joi.allow(""),
    companyModel: Joi.allow(""),
    companyEmployees: Joi.allow(""),
    workingTime: Joi.allow(""),
    workOvertime: Joi.allow(""),
    description: Joi.allow(""),
    phone: Joi.allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage,
    });
    return;
  }

  next();
};

export const createJobPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Vui lòng nhập tên công việc!",
    }),
    salaryMin: Joi.allow(""),
    salaryMax: Joi.allow(""),
    position: Joi.string().required().messages({
      "string.empty": "Vui lòng chọn cấp bậc!",
    }),
    workingForm: Joi.string().required().messages({
      "string.empty": "Vui lòng chọn hình thức làm việc!",
    }),
    technologies: Joi.allow(""),
    images: Joi.string().required().messages({
      "string.empty": "Vui lòng chọn hình ảnh!",
    }),
    description: Joi.allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;

    res.json({
      code: "error",
      message: errorMessage,
    });
    return;
  }

  next();
};
