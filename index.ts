import express from "express";

const app = express();

app.get("/api", (_, res: any) => {
  res.json({ msg: "hello from the server" });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server started!!!");
});
