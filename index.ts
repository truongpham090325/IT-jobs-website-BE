import express from "express";
import cors from "cors";
import routes from "./routes/index.route";
import dotenv from "dotenv";
import { connect } from "./config/database.config";

const app = express();
const port = 4000;

// Load biến môi trường từ .env
dotenv.config();

// Kết nối CSDL
connect();

// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//Cho phép gửi dữ liệu lên dạng json
app.use(express.json());

// Thiết lập đường dẫn
app.use("/", routes);

app.listen(port, () => {
  console.log(`Website đang chạy ở cổng ${port}`);
});
