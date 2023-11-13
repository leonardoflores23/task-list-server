/*const express = require ('express');
const listViewRouter = express.Router()

listViewRouter.get('/completed',(req, res)=>{
    res.write('Formularios, presentaciones');
    res.end();
});

listViewRouter.get('/incomplete', (req, res)=>{
    res.json('llamar a clientes, firmar contratos');
    res.end();
})

module.exports=listViewRouter;*/



const express = require('express');
const listViewRouter = express.Router();

// Middleware para gestionar parámetros incorrectos
const validarParametros = (req, res, next) => {
  if (req.params && req.params.id && !isValidId(req.params.id)) {
    return res.status(400).json({ error: 'ID de tarea no válido' });
  }
  next();
};

// Obtener todas las tareas
listViewRouter.get('/tareas', (req, res) => {
  const data = fs.readFileSync('Database.txt', 'utf-8').split('\n');
  res.status(200).json(data);
});

// Obtener una sola tarea
app.get('/tareas/:indice', (req, res) => {
  const indice = parseInt(req.params.indice);
  const data = fs.readFileSync('Database.txt', 'utf-8').split('\n');
  
  if (indice >= 0 && indice < data.length) {
      res.status(200).json({ tarea: data[indice] });
  } else {
      res.status(404).json({
          msg: 'Tarea no encontrada'
      });
  }
});

// Listar tareas completas
listViewRouter.get('/tareas/completas', (req, res) => {
  const data = fs.readFileSync('Database.txt', 'utf-8').split('\n');
  const tareasCompletas = data.filter(tarea => tarea.trim() !== '' && tarea.includes('[X]'));
  res.status(200).json(tareasCompletas);
});

// Listar tareas incompletas
listViewRouter.get('/tareas/incompletas', (req, res) => {
  const data = fs.readFileSync('Database.txt', 'utf-8').split('\n');
  const tareasIncompletas = data.filter(tarea => tarea.trim() !== '' && !tarea.includes('[X]'));
  res.status(200).json(tareasIncompletas);
});


listViewRouter.use('/:id', validarParametros);

function isValidId(id) {
   // Verificar si el ID es un número
   const parsedId = parseInt(id, 10);

   // Verificar si el ID es un número entero positivo
   if (Number.isInteger(parsedId) && parsedId > 0) {
     return true; // El ID es válido
   } else {
     return false; // El ID no es válido
   }
 }

module.exports = listViewRouter;

