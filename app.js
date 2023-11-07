
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken'); // Importa el módulo JWT

const port = process.env.PORT;
const FIRMA_JWT = process.env.FIRMA_JWT

// Middleware para gestionar métodos HTTP válidos
const validarMetodosHTTP = (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
    return res.status(405).send('Método HTTP no válido');
  }
  next();
};

// Middleware para validar el token JWT
const validarTokenJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token JWT no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agregar la información del usuario a la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token JWT no válido' });
  }
};

// Importa los routers
const listViewRouter = require('./router/listViewRouter');
const listEditRouter = require('./router/listEditRouter');

app.use(express.json());

app.use(validarMetodosHTTP);

app.use(listViewRouter);
app.use(listEditRouter);

// Ruta /login para autenticación
app.post('/login', (req, res) => {
  const users = [
    { username: 'usuario1', password: 'contrasena1' },
    { username: 'usuario2', password: 'contrasena2' },
    // Agrega otros usuarios aquí
  ];

  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  // Crea un token JWT
  const token = jwt.sign({ username }, process.env.JWT_SECRET);

  res.json({ token });
});

// Ruta protegida
app.get('/protected', validarTokenJWT, (req, res) => {
  res.json({ message: 'Ruta protegida accesible' });
});

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
