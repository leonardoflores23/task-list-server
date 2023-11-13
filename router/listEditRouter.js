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


const validarSolicitud = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Cuerpo de solicitud vacío' });
    } else if (!req.body.username) {
      return res.status(400).json({ error: 'Campo "username" faltante en la solicitud' });
      
    }
  }
  next();
}

listEditRouter.use(validarSolicitud);

// Crear una nueva tarea
listEditRouter.post('/tareas', (req, res) => {
  const { tarea } = req.body;
  fs.appendFileSync('Database.txt', tarea + '\n');
  res.status(201).json({
      msg: `La tarea (${tarea}) fue añadida con éxito`
  });
});

// Actualizar una tarea
listEditRouter.put('/tareas/:indice', (req, res) => {
  const indice = parseInt(req.params.indice);
  const { tarea } = req.body;
  const data = fs.readFileSync('Database.txt', 'utf-8').split('\n');
 
  if (indice >= 0 && indice < data.length) {
      data[indice] = tarea;
      fs.writeFileSync('Database.txt', data.join('\n'));
      res.status(200).json({ msg: 'Tarea actualizada con éxito' });
  } else {
      res.status(404).json({
          msg: 'Tarea no encontrada'
      });
  }
});

// Eliminar una tarea
listEditRouter.delete('/tareas/:indice', (req, res) => {
  const indice = parseInt(req.params.indice);
  const data = fs.readFileSync('Database.txt', 'utf-8').split('\n');
  
  if (indice >= 0 && indice < data.length) {
      data.splice(indice, 1);
      fs.writeFileSync('Database.txt', data.join('\n'));
      res.status(200).json({ msg: 'Tarea eliminada con éxito' });
  } else {
      res.status(404).json({
          msg: 'Tarea no encontrada'
      });
  }
});
module.exports = listEditRouter;

