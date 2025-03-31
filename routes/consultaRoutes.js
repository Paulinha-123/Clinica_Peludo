
const express = require('express');

const ConsultaAgendada = require('../models/ConsultaAgendada');

const HistoricoConsulta = require('../models/HistoricoConsulta');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/consultas/agendadas/:usuarioId', authenticate, async (req, res) => {
  
    try {
   
        const consultas = await ConsultaAgendada.find({ usuarioId: req.params.userId });
        res.json(consultas);
   
    } catch (error) {
   
        res.status(500).json({ error: 'Erro ao buscar consultas agendadas' });
    
    }

});


router.get('/historico', authMiddleware, async (req, res) => {
   
    try {
     
        const historico = await HistoricoConsulta.find({ usuarioId: req.user.userId });
        res.json(historico);
   
    } catch (error) {
  
        res.status(500).json({ error: 'Erro ao buscar histórico de consultas' });
   
    }
});

module.exports = router;
