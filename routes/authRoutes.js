const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

function generateAuthToken(user) {
 
  const payload = { userId: user._id };
  const secret = "secreta"; 
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);

}


router.post("/register", async (req, res) => {
  const { email, senha } = req.body;

  try {
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já está cadastrado" });
 
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const newUser = new User({  email, senha: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  
  } catch (error) {
 
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
 
  }
});


router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  
  try {
  
    const user = await User.findOne({ email });
   
    if (!user) {
   
      return res.status(400).json({ error: "Usuário não encontrado" });
  
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ error: "Senha incorreta" });
   
    }


    const token = generateAuthToken(user);
    res.json({ message: "Login bem-sucedido", token });
 
  } catch (error) {
   
    res.status(500).json({ error: "Erro no servidor" });
  
  }
});

module.exports = router;


