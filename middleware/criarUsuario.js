const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const readline = require("readline");

const User = require("../models/user");

const MONGO_URI = "mongodb://localhost:27017/clinicaDB";

async function conectarMongoDB() {
 
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB");
 
  } catch (err) {
    console.error("Erro ao conectar:", err.message);
    process.exit(1);
  
  }

}

async function criarUsuario() {
  
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question("Digite o e-mail do novo usuário: ", (email) => {
   
    rl.question("Digite a senha: ", async (senha) => {
   
      try {
    
        const existente = await User.findOne({ email });
        if (existente) {
          console.log("Usuário com este e-mail já existe!");
     
        } else {
       
          const novo = new User({ email, password: senha });
          await novo.save();
          const token = jwt.sign({ userId: novo._id }, "secreta", { expiresIn: "1h" });
          console.log("✅ Usuário criado!");
          console.log(" Token:", token);
       
        }
     
      } catch (err) {
  
        console.error("Erro ao criar:", err.message);
  
      } finally {
        rl.close();
  
        await mongoose.disconnect();
  
      }
 
    });
 
  });
}

async function autenticarUsuario() {
 
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question("Digite o e-mail para login: ", (email) => {
  
    rl.question("Digite a senha: ", async (senha) => {
   
      try {
     
        const user = await User.findOne({ email });
        if (!user) {
          console.log("Usuário não encontrado!");
       
        } else {
      
          const ok = await bcrypt.compare(senha, user.password);
      
          if (!ok) {
        
            console.log("❌ Senha incorreta!");
       
          } else {
            const token = jwt.sign({ userId: user._id }, "secreta", { expiresIn: "1h" });
            console.log("✅ Login bem-sucedido!");
            console.log("🔐 Token:", token);
        
          }
      
        }
      } catch (err) {
      
        console.error("Erro ao autenticar:", err.message);
     
      } finally {
      
        rl.close();
       
        await mongoose.disconnect();
     
      }
    });
  });
}

async function main() {
  
  await conectarMongoDB();

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question("Digite (1) para criar usuário ou (2) para login: ", (resposta) => {
   
    rl.close();
  
    if (resposta === "1") {
      criarUsuario();
   
    } else if (resposta === "2") {
      autenticarUsuario();
   
    } else {
    
      console.log("Opção inválida.");
      mongoose.disconnect();
    
    }
  });
}

main();
