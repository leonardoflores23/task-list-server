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

listEditRouter.put('/', (req, res) => {
  const envioInformacion = req.body;
  console.log(envioInformacion);
  res.status(200).json({ message: 'PUT listEdit successful' });
});

listEditRouter.post('/', (req, res) => {
  const envioInformacion = req.body;
  console.log(envioInformacion);
  res.status(200).json({ message: 'POST listEdit successful' });
});

module.exports = listEditRouter;

