
import './GerenciarEncontro.css'
import Container from "react-bootstrap/esm/Container";
import { useEffect, useState, useContext} from 'react';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Footer from "../../components/Footer/Footer";
import InputGroup from 'react-bootstrap/InputGroup';
import Paginacao from '../../components/Paginacao/Paginacao.jsx';
import { UserContext } from '../../Context/UserContext.jsx'
import axios from 'axios';
import { userLoggedProf } from "../../Service/userservice.js";
import ModalListAluno from '../../components/ModalListAlunos/ListAlunos.jsx';
import AddAluno from '../../components/ModalListAlunos/AddAlunos.jsx';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ModalEditar from '../../components/ModalEditarEncontro/ModalEditarEncontro.jsx';
const baseURL = 'https://inova-if-api.vercel.app'
const ITEMS_PER_PAGE = 20;
export default function GerenciarEncontro(){
  const { user, setUser } = useContext(UserContext);
  async function findUserLoggedProf(){
    try {
      const response = await userLoggedProf();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
   }
   useEffect(() => {
    if (localStorage.getItem("token")) findUserLoggedProf();
  }, []);

  
    const [myCadastrados, setMyCadastrados] = useState([]);
    const [allAluno, setAllAluno] = useState([]);
    const [show, setShow] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [modalId, setModalId] = useState();
    const [modalId2, setModalId2] = useState();
    //foi criado as duas pq colocar as info do modal em uma variavel ta causando instabilidae
    const [tituloModal, setTituloModal] = useState([]);
    const [tituloDataHoraModal, setTituloDataHoraModal] = useState([]);
    const [key, setKey] = useState('meuCadastros');

    const handleUpdateEncontro = (updatedEncontro) => {
      setMyCadastrados((prevCadastros) => {
        const newCadastros = prevCadastros.map((cadastro) => {
          if (cadastro.id_encontro === updatedEncontro.id_encontro) {
            return updatedEncontro;
          }
          return cadastro;
        });
        return newCadastros;
      });
    };
   
    useEffect(() => {
      let isSubscribed = true;
      const fetchMyCadastros = async () => {
        try {
          const response = await axios.get(`${baseURL}/encontros/myCadastros/${user.id_professora}`);
          if (isSubscribed) {   
            setMyCadastrados(response.data.data);
          }

        } catch (error) {
          toast.error('Ocorreu um erro ao conectar com servidor, tente novamente mais tarde')

         }
      }
      
      if(user){
        fetchMyCadastros();

      }
    
       return () => {
    isSubscribed = false;
  };
      }, [user]);

      useEffect(() => {
       
        const fetchAllAluno = async () => {
          try {
            const response = await axios.get(`${baseURL}/user/allAluno`);
              setAllAluno(response.data.data);

          } catch (error) {
            // console.error('Erro ao recuperar dados:', error);
            toast.error('Ocorreu um erro ao conectar com servidor, tente novamente mais tarde')
  
           }
        }
        fetchAllAluno();
        }, []);
        
    function formatDate(dateString) {
        const parts = dateString.split("-")
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }

      const excluirEncontro = async(id_encontro)=>{
        try {
          const response = await axios.get(`${baseURL}/inscricao/beforeRemove/${id_encontro}`);
          if (response.data.msg === "Não há inscrições nesse encontro") {
              if (window.confirm("Tem certeza que deseja excluir?")) {
                  try {
                      const response = await axios.delete(`${baseURL}/encontros/deleteEncontro/${id_encontro}`);
                      toast.success("Encontro excluído com sucesso!")
                      const updatedMyCadastro = myCadastrados.filter(item => item.id_encontro !== id_encontro);
                      setMyCadastrados(updatedMyCadastro);
                  } catch (error) {
                      toast.error("Ocorreu um erro, tente novamente!")
                  }
              } else {
                  return;
              }
          } else {
              toast.info("Encontro possui inscrições efetuadas. Cancele as inscrições antes de prosseguir.")
          }
      } catch (error) {
          toast.error("Ocorreu um erro, tente novamente!")
      }
     
      }
      const [myCadastroCurrentPage, setMyCadastroCurrentPage] = useState(1);
  const [allAlunoCurrentPage, setAllAlunoCurrentPage] = useState(1);

  const myCadastroTotalPages = Math.ceil(myCadastrados?.length / ITEMS_PER_PAGE);
  const allAlunoTotalPages = Math.ceil(allAluno?.length / ITEMS_PER_PAGE);

  const [busca, setBusca] = useState('');
      const lowerBusca = busca.toLowerCase();
      const filteredMeusEncontros = myCadastrados?.filter((meusCadastros) => {
        return Object.values(meusCadastros).some(value => typeof value === 'string' && value.toLowerCase().includes(lowerBusca));
      });

  const myCadastroPaginatedData = filteredMeusEncontros?.slice(
    (myCadastroCurrentPage - 1) * ITEMS_PER_PAGE,
    myCadastroCurrentPage * ITEMS_PER_PAGE
  );

  const allAlunoPaginatedData = allAluno?.slice(
    (allAlunoCurrentPage - 1) * ITEMS_PER_PAGE,
    allAlunoCurrentPage * ITEMS_PER_PAGE
  );

  const handleMyCadastroPageChange = (page) => {
    setMyCadastroCurrentPage(page);
  };

  const handleAllAlunoPageChange = (page) => {
    setAllAlunoCurrentPage(page);
  };
      
      //função necessaria para abrir a lista de acordo com id_encontro corretamente
      const mostrarModal = (id_encontro, titulo_encontro, data_inicio, hora_inicio, hora_fim) => {
        setShow(true);
        const transformDate = formatDate(data_inicio)
        setModalId(id_encontro);
        setTituloDataHoraModal([titulo_encontro, transformDate, hora_inicio, hora_fim])
        
      }
    const [editEncontro, setEditEncontro] = useState([])

      const mostrarModalEditarEncontro = async (id_encontro, userProf) => {
        setShowModalEdit(true);
        try {
          const response = await axios.get(`${baseURL}/encontros/editCadastro/${userProf}/${id_encontro}`);          
         setEditEncontro(response.data.data);
        } catch (error) {
          toast.error('Ocorreu um erro ao conectar com servidor, tente novamente mais tarde')

         }
      
      }
   

      const mostrarModalAddAluno = (id_encontro, titulo_encontro, data_inicio, hora_inicio) => {  
        setShowModalAdd(true);
        setModalId2(id_encontro);
        setTituloModal([titulo_encontro, data_inicio, hora_inicio]);
      
      }
     
    return (
      <>
    
        <Container className="container-meu-cadastro mt-3">
          <h1 className="m-4 h1-cadastrados">Meus Encontros Cadastrados</h1>
            <div className="box-my-encontros p-4">
              <Tabs 
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 list-tab"
                  >
                    <Tab eventKey="meuCadastros" title="Meus Encontros Cadastrados">
                    <div className="d-flex h-50  justify-content-end mb-3">
                      <InputGroup className="w-50 h-25 ">
                        <Form.Control
                            type="search"
                            placeholder="Procurar por título, data, hora, sala..."
                            className="w-50"
                            aria-label="Search"
                            value={busca}
                            onChange={(ev) => setBusca(ev.target.value)}
                          />
                        <InputGroup.Text id="Search" ><i className="bi bi-search"></i></InputGroup.Text>
                      </InputGroup>
                    </div>
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Título Encontro</th>
                                <th>Descrição</th>
                                <th>Sala</th>
                                <th>Data Início</th>
                                <th width="80px">Horário</th>
                                <th width="85px"> Se repete?</th>
                                <th width="85px">Lista de inscritos</th>
                                <th width="85px">Adicionar Aluna(o)</th>
                                <th width="75px">Editar</th>
                                <th width="75px">Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                              { myCadastrados && myCadastrados.length > 0 ? (
                                myCadastroPaginatedData.map((encontro, index) => (
                                    <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{encontro.titulo_encontro}</td>
                                      <td>{encontro.descricao_encontro}</td>
                                      <td>{encontro.sala}</td>
                                      <td>{formatDate(encontro.data_inicio)}</td>
                                      <td>{encontro.hora_inicio} até {encontro.hora_fim}</td>
                                      <td>{encontro.repete}</td>
                                      <td>
                                        <button className="modal-button" onClick={() => mostrarModal(encontro.id_encontro, encontro.titulo_encontro, encontro.data_inicio, encontro.hora_inicio, encontro.hora_fim)}>
                                          <i className="bi bi-person-check-fill"></i>
                                        </button>
                                        <ModalListAluno encontroId={modalId} infoModal={tituloDataHoraModal} show={show} setModalOpen={() => setShow(false)} userProf={user.id_professora}/>
                                      </td>
                                      <td>
                                        <button className="modal-button" onClick={() => mostrarModalAddAluno(encontro.id_encontro, encontro.titulo_encontro, encontro.data_inicio, encontro.hora_inicio)}>
                                          <i className="bi bi-person-plus-fill"></i>
                                        </button>
                                        <AddAluno idEncontro={modalId2} tituloModal={tituloModal} showAddAluno={showModalAdd} modalAddOpen={() => setShowModalAdd(false)} userProf={user.id_professora} />
                                      </td>
                                      <td>
                                        <button className="modal-button" onClick={() => mostrarModalEditarEncontro(encontro.id_encontro, user.id_professora)}> 
                                          <i className="bi bi-pencil-square" ></i>
                                        </button>
                                        <ModalEditar dataEncontro={editEncontro[0]} showEdit={showModalEdit}  onUpdateEncontro={handleUpdateEncontro} modalOpen={() => setShowModalEdit(false)}/>
                                      </td>
                                      <td>
                                        <button className="modal-button" onClick={() => excluirEncontro(encontro.id_encontro)}>
                                          <i className="bi bi-trash-fill" ></i>
                                        </button>                               
                                      </td>
                                    </tr>
                                ))
                              ) : (
                                    <tr>
                                      <td colSpan={11}>Você ainda não realizou nenhum cadastro...</td>
                                    </tr>
                                  )}
                          
                            </tbody>
                        </Table>
                        <Paginacao  
                        currentPage={myCadastroCurrentPage}
                        totalPages={myCadastroTotalPages}
                        onPageChange={handleMyCadastroPageChange} 
                        />
                    </Tab>

                  <Tab eventKey="lista"  title="Lista de Alunos Cadastrados">
                  
                    <Table striped bordered hover responsive="sm mt-4">
                      <thead>
                          <tr>
                          <th>#</th>
                          <th>Nome</th>
                          <th>Matrícula</th>
                          <th>Email</th>
                          
                          </tr>
                      </thead>
                      <tbody>
                        {allAlunoPaginatedData.map((aluno, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{aluno.nome_aluna}</td>
                            <td>{aluno.mat_aluna}</td>
                            <td>{aluno.email}</td>
                          </tr>
                        ))}
                      </tbody>

                    </Table>
                    <Paginacao
                    currentPage={allAlunoCurrentPage}
                    totalPages={allAlunoTotalPages}
                    onPageChange={handleAllAlunoPageChange} 
                    />
                </Tab>       
              </Tabs>
                    
            </div>
        </Container>
        <Footer/>
      </>
    )
}