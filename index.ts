import express, { Application, Response } from "express";
import path from "path";
import users from "./routes/users";
import auth from "./routes/auth";

const main = async () => {
  const app: Application = express();

  app.use(express.json());

  app.get("/api", (_, res: Response) => {
    res.json({ msg: "hello from the server" });
  });

  app.use("/api/users", users);
  app.use("/api/auth", auth);

  //serve static assets in production
  if (process.env.NODE_ENV === "production") {
    //set static folder
    app.use(express.static("client/build"));

    app.get("*", (_, res: Response) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  app.listen(process.env.PORT || 4000, () => {
    console.log("server started!");
  });
};

main().catch((err) => console.log(err));
