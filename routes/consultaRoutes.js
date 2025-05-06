const express = require("express");

const ConsultaAgendada = require("../models/ConsultaAgendada");

const HistoricoConsulta = require("../models/HistoricoConsulta");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "secreta", (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.userId = decoded.userId;
    next();
  });
}



router.get(
  "/agendadas/:usuarioId",
  authenticate,
  async (req, res) => {
    try {
      const consultas = await ConsultaAgendada.find({
        usuarioId: req.params.userId,
      });
      res.json(consultas);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar consultas agendadas" });
    }
  }
);

router.get("/historico", authMiddleware, async (req, res) => {
  try {
    const historico = await HistoricoConsulta.find({
      usuarioId: req.user.userId,
    });
    res.json(historico);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar histórico de consultas" });
  }
});

module.exports = router;
