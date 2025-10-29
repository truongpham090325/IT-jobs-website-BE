import express, { Request, Response } from "express";

const app = express();
const port = 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Website đang chạy ở cổng ${port}`);
});
