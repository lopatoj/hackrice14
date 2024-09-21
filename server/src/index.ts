import express from "express";
import https from "node:https";
import fs from "node:fs";

const app = express();

app.get("/", (req, res) => {
  res.send("test");
});

if (process.env.NODE_ENV === "production") {
  https.createServer({
    key: fs.readFileSync("/root/motivibe.live.key"),
    cert: fs.readFileSync("/root/cert.txt"),
  }, app).listen(443, () => {
    console.log("listening");
  });
} else {
  app.listen(80);
}