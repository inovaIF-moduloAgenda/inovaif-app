import postgre from '../../database.js';

const encontrosController = {
    createEncontro: async(req, res) => {
        try {
            const {
                titulo_encontro, 
                descricao_encontro, 
                criterios_avaliacao,
                sala, 
                num_vagas, 
                data_inicio, 
                hora_inicio, 
                hora_fim, 
                repete,  
                disponivel_inscricao, 
                id_professora, 
                id_area_conhecimento, 
                id_componente_curricular, 
                id_tipoObj_objApren_etapa } = req.body

            const sql = 'INSERT INTO encontro(titulo_encontro, descricao_encontro, criterios_avaliacao, sala, num_vagas, data_inicio, hora_inicio, hora_fim, repete, disponivel_inscricao, id_professora, id_area_conhecimento, id_componente_curricular, id_tipoObj_objApren_etapa) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *'
 
            const { rows } = await postgre.query(sql, [
                titulo_encontro, 
                descricao_encontro, 
                criterios_avaliacao,
                sala, 
                num_vagas, 
                data_inicio, 
                hora_inicio, 
                hora_fim, 
                repete, 
                disponivel_inscricao, 
                id_professora, 
                id_area_conhecimento, 
                id_componente_curricular, 
                id_tipoObj_objApren_etapa ])

            res.json({msg: "Encontro criado com sucesso", data: rows[0]})

        } catch (error) {
            console.error(error);
            res.json({ msg: "Ocorreu um erro ao criar encontro" });
        }
    },
    getAllEncontrosDisponivel: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT E.id_encontro, E.titulo_encontro, E.descricao_encontro, E.criterios_avaliacao, E.sala, E.num_vagas, E.data_inicio, E.hora_inicio, E.hora_fim, E.repete, P.nome_professora, AC.area, CC.componente_curricular, TOBJ.tipo_objetivos, OA.objetivo_aprendizagem, ET.etapa FROM encontro E INNER JOIN professora AS P ON E.id_professora = P.id_professora INNER JOIN area_conhecimento AS AC ON E.id_area_conhecimento = AC.id_area_conhecimento INNER JOIN componente_curricular AS CC ON E.id_componente_curricular = CC.id_componente_curricular INNER JOIN tipo_objAprend_etapa AS TAE ON E.id_tipoObj_objApren_etapa = TAE.id_tipoObj_objApren_etapa INNER JOIN tipos_objetivos AS TOBJ ON TAE.id_tipo_objetivos = TOBJ.id_tipo_objetivos INNER JOIN objetivos_aprendizagem AS OA ON TAE.id_objetivo_aprendizagem = OA.id_objetivo_aprendizagem INNER JOIN etapa AS ET ON TAE.id_etapa = ET.id_etapa WHERE E.disponivel_inscricao = 'Sim' AND E.data_inicio >= $1 AND NOT EXISTS (SELECT 1 FROM inscricao AS I WHERE E.id_encontro = I.id_encontro AND I.id_aluna = $2) ORDER BY E.data_inicio, E.hora_inicio ASC", [req.params.dataHoje, req.params.id])
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }
            res.status(200).json({msg: "Não há encontros disponivel para o usuário"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    //PROFESSOR
    getAllEncontrosCadastrados: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT E.id_encontro, E.titulo_encontro, E.descricao_encontro, E.criterios_avaliacao, E.sala, E.num_vagas, E.data_inicio, E.hora_inicio, E.hora_fim, E.repete, E.disponivel_inscricao, E.data_cadastro, P.mat_professora, P.nome_professora, P.email, AC.area, AC.area_sigla, CC.componente_curricular, TOBJ.tipo_objetivos, OA.objetivo_aprendizagem, ET.etapa FROM encontro E INNER JOIN professora P ON E.id_professora = P.id_professora INNER JOIN area_conhecimento AS AC ON E.id_area_conhecimento = AC.id_area_conhecimento INNER JOIN componente_curricular AS CC ON E.id_componente_curricular = CC.id_componente_curricular INNER JOIN tipo_objAprend_etapa AS TAE ON E.id_tipoObj_objApren_etapa = TAE.id_tipoObj_objApren_etapa INNER JOIN tipos_objetivos AS TOBJ ON TAE.id_tipo_objetivos = TOBJ.id_tipo_objetivos INNER JOIN objetivos_aprendizagem AS OA ON TAE.id_objetivo_aprendizagem = OA.id_objetivo_aprendizagem INNER JOIN etapa AS ET ON TAE.id_etapa = ET.id_etapa WHERE P.id_professora <> $1 ORDER BY AC.id_area_conhecimento ASC", [req.params.id])
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

           return res.status(200).json({msg: "Não há encontros cadastrados"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
     //PROFESSOR
    getMyCadastros: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT E.id_encontro, E.titulo_encontro, E.descricao_encontro, E.criterios_avaliacao, E.sala, E.num_vagas, E.data_inicio, E.hora_inicio, E.hora_fim, E.repete, E.disponivel_inscricao, E.data_cadastro, AC.area, AC.area_sigla, CC.componente_curricular, TOBJ.tipo_objetivos, OA.objetivo_aprendizagem, ET.etapa FROM encontro E INNER JOIN professora P ON E.id_professora = P.id_professora INNER JOIN area_conhecimento AS AC ON E.id_area_conhecimento = AC.id_area_conhecimento INNER JOIN componente_curricular AS CC ON E.id_componente_curricular = CC.id_componente_curricular INNER JOIN tipo_objAprend_etapa AS TAE ON E.id_tipoObj_objApren_etapa = TAE.id_tipoObj_objApren_etapa INNER JOIN tipos_objetivos AS TOBJ ON TAE.id_tipo_objetivos = TOBJ.id_tipo_objetivos INNER JOIN objetivos_aprendizagem AS OA ON TAE.id_objetivo_aprendizagem = OA.id_objetivo_aprendizagem INNER JOIN etapa AS ET ON TAE.id_etapa = ET.id_etapa WHERE P.id_professora = $1 ORDER BY E.id_encontro DESC", [req.params.id])
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            return res.status(200).json({msg: "Não há encontros cadastrados"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getEditCadastro: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT E.id_encontro, E.titulo_encontro, E.descricao_encontro, E.criterios_avaliacao, E.sala, E.num_vagas, E.data_inicio, E.hora_inicio, E.hora_fim, E.repete, E.disponivel_inscricao, E.data_cadastro, E.id_tipoobj_objApren_etapa, AC.id_area_conhecimento, CC.id_componente_curricular, TOBJ.tipo_objetivos, OA.id_objetivo_aprendizagem, OA.objetivo_aprendizagem, ET.id_etapa, ET.etapa FROM encontro E INNER JOIN professora P ON E.id_professora = P.id_professora INNER JOIN area_conhecimento AS AC ON E.id_area_conhecimento = AC.id_area_conhecimento INNER JOIN componente_curricular AS CC ON E.id_componente_curricular = CC.id_componente_curricular INNER JOIN tipo_objAprend_etapa AS TAE ON E.id_tipoobj_objApren_etapa = TAE.id_tipoobj_objApren_etapa INNER JOIN tipos_objetivos AS TOBJ ON TAE.id_tipo_objetivos = TOBJ.id_tipo_objetivos INNER JOIN objetivos_aprendizagem AS OA ON TAE.id_objetivo_aprendizagem = OA.id_objetivo_aprendizagem INNER JOIN etapa AS ET ON TAE.id_etapa = ET.id_etapa WHERE P.id_professora = $1 AND E.id_encontro = $2", [req.params.id, req.params.id_encontro])
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            return res.status(200).json({msg: "Não há encontros cadastrados"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    
    updateEncontroById: async(req, res) => {
        try {
            const {titulo_encontro, descricao_encontro, criterios_avaliacao, sala, num_vagas, data_inicio, hora_inicio, hora_fim, disponivel_inscricao, id_tipoobj_objApren_etapa} = req.body

            const sql = 'UPDATE encontro SET titulo_encontro = $1, descricao_encontro = $2, criterios_avaliacao = $3, sala = $4, num_vagas = $5, data_inicio = $6, hora_inicio = $7, hora_fim = $8, disponivel_inscricao = $9, id_tipoobj_objApren_etapa = $10 WHERE id_encontro = $11 RETURNING *'

            const { rows } = await postgre.query(sql, [titulo_encontro, descricao_encontro, criterios_avaliacao, sala, num_vagas, data_inicio, hora_inicio, hora_fim, disponivel_inscricao, id_tipoobj_objApren_etapa, req.params.id])

            return res.json({msg: "OK", data: rows[0]})

        } catch (error) {
            res.json({msg: "Error ao atualizar Encontro"})
        }
    },
    deleteEncontroById: async(req, res) => {
        try {
            const sql = 'DELETE FROM encontro WHERE id_encontro = $1 RETURNING *'

            const { rows } = await postgre.query(sql, [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows[0]})
            }
            return res.status(200).json({msg: "Encontro não localizado"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    }


}
export default encontrosController;


