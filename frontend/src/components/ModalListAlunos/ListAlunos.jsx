import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { toast } from "react-toastify";
import Paginacao from '../../components/Paginacao/Paginacao.jsx';
import { useEffect, useState} from 'react';
import './ModalList.css'
const baseURL = 'https://inova-if-api.vercel.app'

const ITEMS_PER_PAGE = 10;

export default function ModalList({ show, setModalOpen, encontroId, infoModal, userProf}){
      const titulo_encontro = infoModal[0];
      const data_inicio = infoModal[1];
      const hora_inicio = infoModal[2];
      const hora_fim = infoModal[3];
    const [listAlunoInscrito, setListAlunoInscrito] = useState([])
    const [modalListOpen, setModalListOpen] = useState(false);
    useEffect(() =>{
      if(encontroId && userProf){
        setModalListOpen(true);
      }
    }, [encontroId]);
  
    useEffect(() => {  
      if(modalListOpen && encontroId && userProf){
      const fetchAlunoInscritosEncontro = async () => {
        try {
          const response = await axios.get(`${baseURL}/inscricao/listInscritos/${userProf}/${encontroId}`); 
          // console.log(response);

          setListAlunoInscrito(response.data.data);
        } catch (error) {
          // console.error('Erro ao recuperar dados:', error);
          toast.error('Ocorreu um erro ao conectar com servidor, tente novamente mais tarde')
         }
      }
      fetchAlunoInscritosEncontro();
    }
      }, [modalListOpen, encontroId, userProf]);

      

        
        const removerAluno = async(id_inscricao)=>{
          if(window.confirm("Tem certeza que deseja remover?")){
              try {
                  const response = await axios.delete(`${baseURL}/inscricao/deleteinscricao/${id_inscricao}`);
                  toast.success("Aluna(o) removido do encontro!")
                  const updatedlistInscrito = listAlunoInscrito.filter(item => item.id_inscricao !== id_inscricao);
                  setListAlunoInscrito(updatedlistInscrito);
                
              } catch (error) {
                  toast.error("Ocorreu um erro ao remover aluno, tente novamente mais tarde!")
                  
              } 
          }else{
              return;
          }
       
        }
            //variaveis para paginação
            const [alunoEncontroCurrentPage, setAlunoEncontroCurrentPage] = useState(1);
            

            const alunoEncontroTotalPages = Math.ceil(listAlunoInscrito?.length / ITEMS_PER_PAGE);
            
            const alunoEncontroPaginatedData = listAlunoInscrito?.slice(
            (alunoEncontroCurrentPage - 1) * ITEMS_PER_PAGE,
            alunoEncontroCurrentPage * ITEMS_PER_PAGE
            );

           

            const handleAlunoEncontroPageChange = (page) => {
              setAlunoEncontroCurrentPage(page);
            };


    return(
        <>
          <Modal    
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} 
            >
              <Modal.Header >
                  <Modal.Title>Alunas(os) inscritos no encontro - "{titulo_encontro}"</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <p>Data de Início: {data_inicio} / Horário: {hora_inicio} até {hora_fim}</p>
                  
                  <Table striped bordered hover responsive="sm mb-2">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Email</th>
                        <th>Remover</th>
                        </tr>
                    </thead>
                      <tbody>
                        {listAlunoInscrito && listAlunoInscrito.length > 0 ? (
                            alunoEncontroPaginatedData.map((aluno, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{aluno.nome_aluna}</td>
                                  <td>{aluno.mat_aluna}</td>
                                  <td>{aluno.email}</td>
                                  <td>
                                    <button className="modal-button" onClick={() => removerAluno(aluno.id_inscricao, aluno.id_aluna)}> <i className="bi bi-trash-fill" ></i></button>
                                  </td>    
                                </tr>
                            ))
                        ) : (
                                <tr>
                                  <td colSpan={5}>Não há inscritos nesse encontro...</td>
                                </tr>
                          )}
                      </tbody>
                  </Table>
                <Paginacao  
                  currentPage={alunoEncontroCurrentPage}
                  totalPages={alunoEncontroTotalPages}
                  onPageChange={handleAlunoEncontroPageChange} 
                />
              
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={setModalOpen}>Cancelar</Button>
                  <Button variant="success" onClick={setModalOpen} >Feito</Button>
              </Modal.Footer>
          </Modal>
        </>
    )
}