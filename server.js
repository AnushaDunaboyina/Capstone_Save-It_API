import cors from "cors";
import express from "express";


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to SaveIt app");
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
