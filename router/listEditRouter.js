/*const express = require('express');

const listEditRouter = express.Router();

listEditRouter.post('/create',(req, res)=>{
    res.json('Created Successfully')
});

listEditRouter.delete('/deleted/:id', (req, res)=> {
    const taskId = req.params.id;
    res.json('Deleted Successfully')
});
listEditRouter.put('/updated/:id', (req, res)=> {
    const taskId = req.params.id;
    res.json('Updated Successfully')
});

module.exports=listEditRouter;*/



const express = require('express');
const listEditRouter = express.Router();


listEditRouter.post('/create', (req, res) => {
 
  res.write('Objeto Creado');
  res.end()
});


listEditRouter.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  
  res.write('Objeto eliminado');
  res.end()
});


listEditRouter.put('/update/:id', (req, res) => {
  const taskId = req.params.id;
 
  res.write('Obejto Actualizado');
  res.end()
});

module.exports = listEditRouter;
