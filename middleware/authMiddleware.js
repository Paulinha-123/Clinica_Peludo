const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization'); 

    if (!token) {
        return res.status(401).json({ error: 'Acesso negado! Token não fornecido.' });
    }

    try {
       
        const decoded = jwt.verify(token, 'secreta'); 
        req.user = decoded; 
        next(); 
   
    } catch (error) {
  
        return res.status(400).json({ error: 'Token inválido!' });
 
    }
};

module.exports = authenticate;

