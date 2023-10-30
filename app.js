
const express = require('express');
const app = express();
const port = 8080;

// Middleware para gestionar métodos HTTP válidos
const validarMetodosHTTP = (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
    return res.status(405).send('Método HTTP no válido');
  }
  next();
};

// Importa los routers
const listViewRouter = require('./router/listViewRouter');
const listEditRouter = require('./router/listEditRouter');

// Aplica el middleware de validación de métodos HTTP a nivel de aplicación
app.use(validarMetodosHTTP);

app.use(express.json());


app.use(listViewRouter);
app.use(listEditRouter);

app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});












/*const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Importar los routers
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Montar los routers en rutas específicas
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

/*app.get('/tasks', (req, res) => {
    // Ejemplo de lista de tareas en formato JSON
    const tasks = [
      {
        id: '123456',
        isCompleted: false,
        description: 'Walk the dog'
      },
      // Agrega más tareas según sea necesario
    ];
  
    // Enviar una respuesta en formato JSON
    res.json(tasks);
  });*/
    
   

/*app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});*/
