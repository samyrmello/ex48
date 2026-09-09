const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

let tarefas = [
  { id: 1, titulo: "Estudar Express" },
  { id: 2, titulo: "Praticar fetch" }
];

app.use(cors({
  origin: "http://localhost:3001"
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});

app.post("/api/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
    return res.status(400).json({
      erro: "O título da tarefa é obrigatório."
    });
  }

  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    titulo: titulo.trim()
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
