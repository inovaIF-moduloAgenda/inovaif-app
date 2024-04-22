import postgre from '../../database.js';

const aprendizagemController ={
    getObjetivoByComponente: async(req, res) => {
        try {
            const { rows } = await postgre.query("SELECT AC.area_sigla, TOBJ.tipo_objetivos, TOBJ.id_tipo_objetivos, OA.id_objetivo_aprendizagem, OA.objetivo_aprendizagem FROM objetivos_aprendizagem OA INNER JOIN area_conhecimento AS AC ON AC.id_area_conhecimento = OA.id_area_conhecimento INNER JOIN tipo_objAprend_etapa as TAE on OA.id_objetivo_aprendizagem=TAE.id_objetivo_aprendizagem INNER JOIN tipos_objetivos AS TOBJ ON TAE.id_tipo_objetivos = TOBJ.id_tipo_objetivos WHERE OA.id_area_conhecimento = $1", [req.params.id])
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }
            res.json({msg: "Não há objetivos cadastrados nessa area do conhecimento"})
        } catch (error) {
            res.json({msg: "Ocorreu um erro ao conectar ao servidor"})
        }
    },
    getEtapaByObjAprendizagem: async(req, res) => {
        try {
        
            const { rows } = await postgre.query("SELECT AC.area_sigla, ET.id_etapa, ET.etapa, TAE.id_tipoObj_objApren_etapa FROM tipo_objAprend_etapa TAE INNER JOIN area_conhecimento AS AC ON TAE.id_area_conhecimento = AC.id_area_conhecimento INNER JOIN tipos_objetivos AS TOBJ ON TAE.id_tipo_objetivos = TOBJ.id_tipo_objetivos INNER JOIN objetivos_aprendizagem AS OA ON TAE.id_objetivo_aprendizagem = OA.id_objetivo_aprendizagem INNER JOIN etapa AS ET ON TAE.id_etapa = ET.id_etapa WHERE TAE.id_objetivo_aprendizagem = $1", [req.params.id])
            if (rows[0]) {
                return res.json({msg: "OK", data: rows})
            }
            res.json({msg: "Não há etapa cadastradas nesse objetivo"})
        } catch (error) {
            res.json({msg: "Ocorreu um erro ao conectar ao servidor"})
        }
    }
    
}
export default aprendizagemController;
