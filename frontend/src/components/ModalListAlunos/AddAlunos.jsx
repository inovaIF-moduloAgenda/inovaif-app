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

export default function AddAluno({idEncontro, tituloModal, modalAddOpen, showAddAluno, userProf}){
  const titulo_encontro = tituloModal[0];
      const data_inicio = tituloModal[1];
      const hora_inicio = tituloModal[2];
      
    const [alunoExceptInscrito, setAlunoExceptInscrito] = useState([])
    const [modalAddAlunoOpen, setModalAddAlunoOpen] = useState(false);
    useEffect(() =>{
      if(idEncontro && tituloModal && userProf){
        setModalAddAlunoOpen(true);
      }
    }, [idEncontro]);
    useEffect(() => {
      if(modalAddAlunoOpen && idEncontro && userProf){
        const fetchAlunoNoInscritos = async () => {
          try {
            const response = await axios.get(`${baseURL}/inscricao/exceptInscritos/${userProf}/${idEncontro}`); 
            setAlunoExceptInscrito(response.data.data);
            // console.log(response);
          } catch (error) {
            // console.error('Erro ao recuperar dados:', error);
            toast.error('Ocorreu um erro ao conectar com servidor, tente novamente mais tarde')
           }
        }
        fetchAlunoNoInscritos();
      }
        }, [modalAddAlunoOpen, idEncontro, userProf]);

    
    const adicionarAluno = async(id_aluna) =>{
        const id_encontro = idEncontro;
        const dataInicio = data_inicio;
        const horaInicio = hora_inicio;
    
        try {
          const response2 = await axios.get(`${baseURL}/inscricao/conferirHorario/${id_aluna}/${horaInicio}/${dataInicio}`);
              const mesmoHorario = response2.data.data;
              if (Number(mesmoHorario[0]) > 0) {
                toast.error("A aluna(o) já tem encontro para essa mesma data e horário");
                return
              } else {
                const body = {id_encontro, id_aluna};
                // console.log(body);
                const response = await axios.post(`${baseURL}/inscricao/addAluno`, body, {
                  headers: {
                    "Content-type": "application/json"
                  }
                }
                );
        
                toast.success("Aluna(o) adicionado ao encontro!")
                const updatedNewAluno = alunoExceptInscrito.filter(item => item.id_aluna !== id_aluna);
                setAlunoExceptInscrito(updatedNewAluno);
        }
            
        } catch (error) {
          toast.error("Ocorreu um erro ao adicionar aluno ao encontro, tente novamente mais tarde")
        }
      }
      const [alunoExceptCurrentPage, setAlunoExceptCurrentPage] = useState(1);
      const alunoExceptTotalPages = Math.ceil(alunoExceptInscrito?.length / ITEMS_PER_PAGE);
      const alunoExceptPaginatedData = alunoExceptInscrito?.slice(
        (alunoExceptCurrentPage - 1) * ITEMS_PER_PAGE,
        alunoExceptCurrentPage * ITEMS_PER_PAGE
        );
        const handleAlunoExceptPageChange = (page) => {
            setAlunoExceptCurrentPage(page);
          };

    return(
        <>
        <Modal    
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showAddAluno} 
           
            >

            <Modal.Header >
                  <Modal.Title>Adicionar Alunas(os) no encontro - "{titulo_encontro}"</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    <Table striped bordered hover responsive="sm mb-2">
                      <thead>
                          <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Matrícula</th>
                            <th>Email</th>
                            <th>Adicionar</th>
                          </tr>
                      </thead>
                      <tbody>
                      {alunoExceptInscrito && alunoExceptInscrito.length > 0 ? (
                        alunoExceptPaginatedData.map((alunoExcept, i) => (
                          <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{alunoExcept.nome_aluna}</td>
                              <td>{alunoExcept.mat_aluna}</td>
                              <td>{alunoExcept.email}</td>
                              <td>
                                <button className="modal-button" onClick={() => adicionarAluno(alunoExcept.id_aluna)}>
                                  <i className="bi bi-person-plus-fill"></i>
                                </button>
                              </td>                 
                          </tr>
                        ))
                      ) : (
                          <tr>
                            <td colSpan={5}>Não há alunos cadastrados...</td>
                          </tr>
                      )}
                      </tbody>
                    </Table>
                    <Paginacao
                      currentPage={alunoExceptCurrentPage}
                      totalPages={alunoExceptTotalPages}
                      onPageChange={handleAlunoExceptPageChange} 
                    />
    
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={modalAddOpen}>Cancelar</Button>
                  <Button variant="success" onClick={modalAddOpen} >Feito</Button>
              </Modal.Footer>

            </Modal>
        </>
    )
}