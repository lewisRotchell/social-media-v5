import express from "express";
import path from "path";

const app = express();

app.get("/api", (_, res: any) => {
  res.json({ msg: "hello from the server" });
});

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 4000, () => {
  console.log("server started!!!");
});
