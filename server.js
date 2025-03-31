
const express = require('express');

const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');

const consultaRoutes = require('./routes/consultaRoutes');

const app = express();

const port = 3000;


app.use(express.json());

app.use('/auth', authRoutes); 

app.use('/api', consultasRoutes); 


mongoose.connect('mongodb://localhost:27017', {
    
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
  
    console.log('Conectado ao MongoDB');

}).catch((err) => {
  
    console.error('Erro ao conectar ao MongoDB', err);

});


app.use('/auth', authRoutes);

app.use('/consultas', consultaRoutes);

app.listen(port, () => {
   
    console.log(`Servidor rodando em http://localhost:${port}`);

});
