import express from "express";
import cors from "cors";
import routes from "./routes/index.route";

const app = express();
const port = 4000;

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
