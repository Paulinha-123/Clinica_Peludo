
const express = require('express');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const router = express.Router();



function generateAuthToken(user) {

    const payload = { userId: user._id };
  
    const secret = 'secreta'; 
  
    const options = { expiresIn: '1h' };
 
    return jwt.sign(payload, secret, options);
}


router.post('/login', async (req, res) => {

    const { username, password } = req.body;
   
    try {
   
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
     
        if (!isMatch) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

     
        const token = generateAuthToken(user);
        res.json({ message: 'Login bem-sucedido', token });
   
    } catch (error) {
   
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;
