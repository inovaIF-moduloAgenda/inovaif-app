import postgre from '../../database.js';
// import authorize from "../middleware/authorize.js";

const userController ={
    getUserAluna: async(req, res) => {
        try {
        
            const user = await postgre.query("SELECT id_aluna, nome_aluna, mat_aluna FROM aluna WHERE id_aluna = $1", [req.user.id])
           return res.json(user.rows[0]);
        } catch (error) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },
    getUserProfessora: async(req, res) => {
        try {
        
            const user = await postgre.query("SELECT id_professora, nome_professora, mat_professora, perfil_gestora FROM professora WHERE id_professora = $1", [req.user.id])
           return res.json(user.rows[0]);
        } catch (error) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },
    getAllAluno: async(req, res) => {
        try {
        
            const { rows } = await postgre.query("SELECT id_aluna, nome_aluna, mat_aluna, email FROM aluna ORDER BY nome_aluna ASC")
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }
            //tem que ser dessa maenira pra voltar resultados dentro de um objeto
             res.json({msg: "Não há encontros cadastrados"})
        } catch (error) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    },
    
}
export default userController;