import "dotenv/config";
import cors from "cors";
import express from "express";

console.log("Olá, Turma!");
console.log("MY_SECRET", process.env.MY_SECRET);
console.log("PYTHON_ROOT", process.env.PYTHON_ROOT);

const app = express();

app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Bem-vindo ao Express de Márcio");
});

app.get("/example", (req, res) => {
  res.send("Bem vindo ao Express: URL example");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
