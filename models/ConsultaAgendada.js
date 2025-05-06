const mongoose = require("mongoose");



const consultaAgendadaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  data: { type: Date, required: true },
  descricao: { type: String, required: true },
});

const ConsultaAgendada = mongoose.model(
  "ConsultaAgendada",
  consultaAgendadaSchema
);

module.exports = ConsultaAgendada;
