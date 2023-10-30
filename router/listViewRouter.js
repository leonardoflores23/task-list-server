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

listViewRouter.get('/completed', (req, res) => {
  res.write('Tarea completada');
  res.end();
});

listViewRouter.get('/incomplete', (req, res) => {
  res.write('Tarea Incompleta');
  res.end();
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

