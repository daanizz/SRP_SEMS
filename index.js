import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Authentication from "./routes/AuthRoutes.js";

const app = express();

dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send("Frontend to be added here..");
});

app.get("/Auth", Authentication);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
