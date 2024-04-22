import postgre from '../../database.js';
const AgendaController = {
    getEncontrosToday: async(req, res) => {
        try {
            
            const { rows } = await postgre.query("SELECT I.id_inscricao, I.id_encontro, I.data_inscricao, E.id_encontro, E.titulo_encontro, E.descricao_encontro, E.criterios_avaliacao, E.sala, E.num_vagas, E.data_inicio, E.hora_inicio, E.hora_fim, P.nome_professora, AC.area, CC.componente_curricular, TOBJ.tipo_objetivos, OA.objetivo_aprendizagem, ET.etapa FROM inscricao AS I INNER JOIN encontro AS E ON I.id_encontro = E.id_encontro INNER JOIN professora AS P ON E.id_professora = P.id_professora INNER JOIN area_conhecimento AS AC ON E.id_area_conhecimento = AC.id_area_conhecimento INNER JOIN componente_curricular AS CC ON E.id_componente_curricular = CC.id_componente_curricular INNER JOIN tipo_objAprend_etapa AS TAE ON E.id_tipoObj_objApren_etapa = TAE.id_tipoObj_objApren_etapa INNER JOIN tipos_objetivos AS TOBJ ON TAE.id_tipo_objetivos = TOBJ.id_tipo_objetivos INNER JOIN objetivos_aprendizagem AS OA ON TAE.id_objetivo_aprendizagem = OA.id_objetivo_aprendizagem INNER JOIN etapa AS ET ON TAE.id_etapa = ET.id_etapa WHERE I.id_aluna = $1 AND E.data_inicio = $2", [req.params.id, req.params.dataHoje])
    //colocar horarario
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }
    
            res.status(200).json({msg: "Não encontros para data de hoje"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getAllDatas: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT E.titulo_encontro, E.descricao_encontro, E.criterios_avaliacao, E.data_inicio, E.hora_inicio, E.hora_fim, E.sala, P.nome_professora, CC.componente_curricular FROM encontro E INNER JOIN professora AS P ON E.id_professora = P.id_professora INNER JOIN componente_curricular AS CC ON E.id_componente_curricular = CC.id_componente_curricular WHERE E.disponivel_inscricao = 'Sim' AND NOT EXISTS (SELECT 1 FROM inscricao AS I WHERE E.id_encontro = I.id_encontro AND I.id_aluna = $1)", [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            res.status(200).json({msg: "Não há encontros disponiveis agendado"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },
    getDataByUser: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT E.titulo_encontro, E.sala, E.data_inicio, E.hora_inicio, E.hora_fim, E.descricao_encontro, E.criterios_avaliacao, P.nome_professora, CC.componente_curricular FROM encontro E INNER JOIN inscricao AS I ON E.id_encontro = I.id_encontro INNER JOIN professora AS P ON E.id_professora = P.id_professora INNER JOIN componente_curricular AS CC ON E.id_componente_curricular = CC.id_componente_curricular WHERE I.id_aluna = $1", [req.params.id])

            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }

            res.status(200).json({msg: "Não há encontros inscritos agendado"})
        } catch (error) {
            res.json({msg: error.msg})
        }
    }
}

export default AgendaController 
