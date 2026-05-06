const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tareas = [];

app.get('/api/tareas', (req, res) => {
  res.json(tareas);});

app.post('/api/tareas', (req, res) => {
  tareas.push(req.body);
  res.json({
    ok: true,
    tarea: req.body});});

app.listen (3000, () => {console.log ('Servidor en puerto 3000');});