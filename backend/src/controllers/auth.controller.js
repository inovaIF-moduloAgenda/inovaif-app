import postgre from '../../database.js';
import bcrypt from "bcrypt";
import generateToken from '../service/auth.service.js'

const authController = {
    loginAluna: async (req, res) => {
        const { matricula, password } = req.body;
        try {
          const user = await postgre.query("SELECT * FROM aluna WHERE mat_aluna = $1", [
            matricula
          ]);
          if (user.rows.length === 0) {
            return res.status(401).json("Matrícula Invalida");
          }
          const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
          );
          if (!validPassword) {
            return res.status(401).json("Senha Inválida");
          }
          const jwtToken = generateToken(user.rows[0].id_aluna);
          return res.json({ jwtToken });
        } catch (e) {
          return res.status(401).send(e.message);
        }
    },
    loginProfessora: async (req, res) => {
      const { matricula, password } = req.body;
    
      try {
        const user = await postgre.query("SELECT * FROM professora WHERE mat_professora = $1", [
          matricula
        ]);
        if (user.rows.length === 0) {
          return res.status(401).json("Matrícula Invalida");
        }
        const validPassword = await bcrypt.compare(
          password,
          user.rows[0].password
        );
        if (!validPassword) {
          return res.status(401).json("Senha Inválida");
        }
        const jwtToken = generateToken(user.rows[0].id_professora);
        return res.json({ jwtToken });
      } catch (e) {
        return res.status(401).send(e.message);
      }
  },
    CadastroAluna: async (req, res) => {
      const { nome, matricula, password, email } = req.body;
    
      try {
        const user = await postgre.query("SELECT * FROM aluna WHERE mat_aluna = $1", [
          matricula
        ]);
    
        if (user.rows.length > 0) {
          return res.status(401).json("Essa matrícula já existe");
        }
    
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);
    
        let newUser = await postgre.query(
          "INSERT INTO aluna (mat_aluna, nome_aluna, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
          [matricula, nome, email, bcryptPassword]
        );
          //ESTA DANDO PROBLEMA NA GERAÇÃO DO TOKEN, MAS O CADASTRO TA FUNCIONANDO
        const jwtToken = generateToken(newUser.rows[0].id_aluna);
    
        return res.json({ jwtToken });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
  },
  CadastroProfessora: async (req, res) => {
    const { nome, matricula, password, email } = req.body;
  
    try {
      const user = await postgre.query("SELECT * FROM professora WHERE mat_professora = $1", [
        matricula
      ]);
  
      if (user.rows.length > 0) {
        return res.status(401).json("Essa matrícula já existe");
      }
  
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
  
      let newUser = await postgre.query(
        "INSERT INTO professora (mat_professora, nome_professora, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [matricula, nome, email, bcryptPassword]
      );
        //ESTA DANDO PROBLEMA NA GERAÇÃO DO TOKEN, MAS O CADASTRO TA FUNCIONANDO
      const jwtToken = generateToken(newUser.rows[0].id_professora);
  
      return res.json({ jwtToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
},
  verificaController: async (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
}
}
export default authController;


