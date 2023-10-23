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

listViewRouter.get('/completed', (req, res) => {
  res.write('Tarea completada');
  res.end()
});


listViewRouter.get('/incomplete', (req, res) => {

  res.write('Tarea Incompleta ');
  res.end()
});

module.exports = listViewRouter;
