const mongoose = require("mongoose");

const historicoConsultaSchema = new mongoose.Schema({
 
  usuarioId: {
 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  
  },
  
  data: { type: Date, required: true },
  descricao: { type: String, required: true },
  observacao: { type: String },
}
);

const HistoricoConsulta = mongoose.model(

  "HistoricoConsulta",
  historicoConsultaSchema

);

module.exports = HistoricoConsulta;
