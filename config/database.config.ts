import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE}`);
    console.log("Kết nối DB thành công!");
  } catch (error) {
    console.log(error);
    console.log("Kết nối DB thất bại!");
  }
};
