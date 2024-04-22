import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './EncontrosDisponivel.css'
import Paginacao from '../../components/Paginacao/Paginacao.jsx';
import { toast } from "react-toastify";
import { userLogged } from "../../Service/userservice.js";
import { useEffect, useState, useContext} from 'react';
import { UserContext } from '../../Context/UserContext.jsx'
import axios from 'axios';
const ITEMS_PER_PAGE = 24;

const baseURL = 'https://inova-if-api.vercel.app'

export default function EncontrosDisponivel(){
  const { user, setUser } = useContext(UserContext);
  const [encontrosDisponivel, setEncontrosDisponivel] = useState([]);

 
  async function findUserLogged(){
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
   }
   useEffect(() => {
    if (localStorage.getItem("token")) findUserLogged();
  }, []);

  const currentDate = new Date(); // Get the current date in JavaScript
  const dataHoje = currentDate.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'
  useEffect(() => {
    const fetchEncontrosDisponivel = async () => {
      try {
        const response = await axios.get(`${baseURL}/encontros/encontrosDisponivel/${dataHoje}/${user.id_aluna}`);
        setEncontrosDisponivel(response.data.data);
        if(response.data.msg == "Não há encontros disponivel para o usuário"){
          toast.info("Não há encontros disponível!")

        }
      } catch (error) {
        toast.error("Ocorreu um erro ao conectar ao servidor, tente novamente mais tarde!")
      }
    };
      fetchEncontrosDisponivel(); 
    }, [user, dataHoje]); 
 
        function formatDate(dateString) {
          const datePart = dateString.substring(0, 10);
          const parts = datePart.split("-")
          return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        
      
        const inscreverEncontro = async (id_encontro, num_vagas, hora_inicio, data_inicio) => {
          try {
            const response1 = await axios.get(`${baseURL}/inscricao/contadorNumVagas/${id_encontro}`);
            const qtdInscritos = response1.data.data;
            if (Number(qtdInscritos[0]) <= num_vagas) {
              const id_aluna = user.id_aluna;
              const response2 = await axios.get(`${baseURL}/inscricao/conferirHorario/${id_aluna}/${hora_inicio}/${data_inicio}`);
              const mesmoHorario = response2.data.data;
              if (Number(mesmoHorario[0]) > 0) {
                toast.error("Você já tem um encontro para esse mesmo horário");
              } else {
                const bodyInscrever = { id_encontro, id_aluna };
                await axios.post(`${baseURL}/inscricao/inscrever`, bodyInscrever, {
                  headers: {
                    "Content-type": "application/json"
                  }
                });
                toast.success("Inscrição realizada com sucesso!");
                setEncontrosDisponivel(encontrosDisponivel.filter((item) => item.id_encontro !== id_encontro));
              }
            } else {
              toast.error("Não há mais vagas nesse encontro!");
            }
          } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao fazer inscrição, tente novamente");
          }
        }
        const [encontroDisponivelCurrentPage, setEncontroDisponivelCurrentPage] = useState(1);
      
        const encontrosDisponivelTotalPages = Math.ceil(encontrosDisponivel?.length / ITEMS_PER_PAGE);

        const [busca, setBusca] = useState('');
        const lowerBusca = busca.toLowerCase();
        const filteredEncontrosDisponivel = encontrosDisponivel?.filter((disponivel) => {
          return Object.values(disponivel).some(value => typeof value === 'string' && value.toLowerCase().includes(lowerBusca));
        });

        const encontrosDisponivelPaginatedData = filteredEncontrosDisponivel?.slice(
          (encontroDisponivelCurrentPage - 1) * ITEMS_PER_PAGE,
          encontroDisponivelCurrentPage * ITEMS_PER_PAGE
        );
       
       
        const handleDisponivelPageChange = (page) => {
          setEncontroDisponivelCurrentPage(page);
        };
    return (
      <>
        <Container className="box-container mt-5">
        <div className="d-flex h-50 justify-content-end">
              <InputGroup className="w-100 h-25">
                <Form.Control
                    type="search"
                    placeholder="Procurar por título, componente, AAAA-MM-DD, 00:00, sala, professora..."
                    
                    aria-label="Search"
                    value={busca}
                    onChange={(ev) => setBusca(ev.target.value)}
                  />
                <InputGroup.Text id="Search" ><i className="bi bi-search"></i></InputGroup.Text>
              </InputGroup>
            </div>
            <h1 className='h1-encontro-disponivel'>Encontros Disponíveis para inscrição</h1>
          <Row>
            <Col>            
                {encontrosDisponivel && encontrosDisponivel.length > 0 ? (
                  <Row xxl={3} xl={2} lg={2} md={1}  className="g-4 mt-2">
                    {encontrosDisponivelPaginatedData.map((encontro, index) => (
                      <Col key={index}>
                        <Card className='cardInscrito-container'>
                          <Card.Header className='d-flex justify-content-end card-header'>{index +1}</Card.Header>
                          <Card.Body>
                            <Card.Title className='py-1 '>{encontro.titulo_encontro}</Card.Title>
                            <ListGroup className="list-group-flush">
                            <ListGroup.Item className="px-1">Componente Curricular: <span>{encontro.componente_curricular}</span></ListGroup.Item>
                              <ListGroup.Item className="px-1 pe-4 d-flex flex-row justify-content-between">
                                <div>Data: <span>{formatDate(encontro.data_inicio)}</span></div>
                                <div>Horário: <span>{encontro.hora_inicio}</span> até <span>{encontro.hora_fim}</span></div>
                                
                              </ListGroup.Item>
                              <ListGroup.Item className="px-1">Descrição: <span>{encontro.descricao_encontro}</span></ListGroup.Item>
                              <ListGroup.Item className="px-1">Critérios de Avaliação: <span>{encontro.criterios_avaliacao}</span></ListGroup.Item>
                              <ListGroup.Item className="px-1">Sala: <span>{encontro.sala}</span></ListGroup.Item>
                              <ListGroup.Item className="px-1 pe-4 d-flex flex-row justify-content-between">
                                <div>Total de vagas: <span>{encontro.num_vagas}</span> </div>
                                <div>Total de encontros
                              <OverlayTrigger                        
                                placement="bottom"
                                overlay={
                                  <Tooltip >
                                    Indicação total de quantas vezes esse mesmo encontro acontece
                                  </Tooltip>
                                }
                              >
                                 <sup><i className="bi bi-question-circle-fill"></i></sup> 
                              </OverlayTrigger>
                             
                              <span>: {encontro.repete!== "Não"? Number(encontro.repete) + 1 + " vezes": 1 + " vez"}</span></div>
                              
                              </ListGroup.Item>
                              <ListGroup.Item className="px-1">Professora(o): <span>{encontro.nome_professora}</span></ListGroup.Item>

                            </ListGroup>
                            
                          </Card.Body>
                          <Card.Footer className="card-footer-disponivel"> 
                          <Button variant="success" style={{fontWeight:'bold'}} onClick={() => inscreverEncontro(encontro.id_encontro, encontro.num_vagas, encontro.hora_inicio, encontro.data_inicio)}>
                              Inscrever
                            </Button>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                </Row>
                ) : (
                  <p>Não há encontros disponíveis.</p>
              
                )}
            </Col>
            <Paginacao  
              currentPage={encontroDisponivelCurrentPage}
              totalPages={encontrosDisponivelTotalPages}
              onPageChange={handleDisponivelPageChange} 
              />
          </Row>
        </Container>
      
    </>
    
    )
}