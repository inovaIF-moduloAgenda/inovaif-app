// // import postgre from '../../database.js';
// const exampleController = {
//     getAllEncontros: async(req, res) => {
//         try {
//             const { rows } = await postgre.query("select * from encontro")
//             res.json({msg: "OK", data: rows})
//         } catch (error) {
//             res.json({msg: error.msg})
//         }
//     },
//     getById: async(req, res) => {
//         try {
//             const { rows } = await postgre.query("select * from books where book_id = $1", [req.params.id])

//             if (rows[0]) {
//                 return res.json({msg: "OK", data: rows})
//             }

//             res.status(404).json({msg: "not found"})
//         } catch (error) {
//             res.json({msg: error.msg})
//         }
//     },
//     // createEncontro: async(req, res) => {
//     //     try {
//     //         const {
//     //             tema,
//     //             id_objetivos_aprendizagem,
//     //             criterios_avaliacao,
//     //             id_sala,
//     //             num_vagas,
//     //             data_inicio,
//     //             hora_inicio,
//     //             id_professora,
//     //             id_area_conhecimento,
//     //             id_componente_curricular,
//     //             num_repeticoes,
//     //             repete,
//     //             titulo_encontro,
//     //             data_fim,
//     //             hora_fim } = req.body

//     //         const sql = 'INSERT INTO encontro(tema, id_objetivos_aprendizagem, criterios_avaliacao, id_sala, num_vagas, data_inicio, hora_inicio, id_professora, id_area_conhecimento, id_componente_curricular, num_repeticoes, repete, titulo_encontro, data_fim, hora_fim) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *'

//     //         const { rows } = await postgre.query(sql, [tema, id_objetivos_aprendizagem, criterios_avaliacao, id_sala, num_vagas, data_inicio, hora_inicio, id_professora, id_area_conhecimento, id_componente_curricular, num_repeticoes, repete, titulo_encontro, data_fim, hora_fim])

//             res.json({msg: "Encontro criado com sucesso", data: rows[0]})

//         } catch (error) {
//             console.error(error);
//             res.json({ msg: "Ocorreu um erro ao criar encontro" });
//         }
//     },
//     updateById: async(req, res) => {
//         try {
//             const { name, price } = req.body

//             const sql = 'UPDATE books set name = $1, price = $2 where book_id = $3 RETURNING *'

//             const { rows } = await postgre.query(sql, [name, price, req.params.id])

//             res.json({msg: "OK", data: rows[0]})

//         } catch (error) {
//             res.json({msg: error.msg})
//         }
//     },
//     deleteById: async(req, res) => {
//         try {
//             const sql = 'DELETE FROM books where book_id = $1 RETURNING *'

//             const { rows } = await postgre.query(sql, [req.params.id])

//             if (rows[0]) {
//                 return res.json({msg: "OK", data: rows[0]})
//             }

//             return res.status(404).json({msg: "not found"})
            

//         } catch (error) {
//             res.json({msg: error.msg})
//         }
//     }
// }

// // export default exampleController 

// //GET
// // Encontros organizados pela data de inicio, disponivel para inscrição
// // Encontros organizados pela data de inicio, inscritos pelo id do usuario logado
