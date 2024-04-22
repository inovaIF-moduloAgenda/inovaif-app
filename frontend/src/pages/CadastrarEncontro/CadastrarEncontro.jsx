import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CadastrarEncontro.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext} from 'react';
import { UserContext } from '../../Context/UserContext.jsx'
import moment from 'moment';

import axios from 'axios';
import { toast } from "react-toastify";

const baseURL = 'https://inova-if-api.vercel.app'
export default function CadastrarEncontro(){
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
    const [selectedComponente, setSelectedComponente] = useState('1');
    //inicia com 410 (não se aplica para area BASE) para nao fazer um get sem o objetivo excolhido
    const [selectedObjAprendizagem, setSelectedObjAprendizagem] = useState('410');
    const [objAprendizagem, setObjAprendizagem] = useState([]);
    const [objAprenEtapa, setObjAprenEtapa] = useState([]);


    const [inputs, setInputs] = useState({
        titulo_encontro:"",
         descricao_encontro:"",
         criterios_avaliacao:"",
         sala:"",
         num_vagas:"",
         data_inicio:"",
         hora_inicio:"",
         hora_fim:"", 
         repete: "",   
         disponivel_inscricao:"",
         id_area_conhecimento:"", 
         id_tipoObj_objApren_etapa:""
      });

      useEffect(() => {
        const fetchObjAprendizagem = async () => {
          try {
            const response = await axios.get(`${baseURL}/aprendizagem/getObjetivo/${selectedComponente}`);
            setObjAprendizagem(response.data.data);
          //  console.log(objAprendizagem)
          } catch (error) {
            toast.error("Ocorreu um erro ao conectar ao servidor, tente novamente mais tarde")
          }
        };
        
        fetchObjAprendizagem();
      }, [selectedComponente]); 

      useEffect(() => {
        const fetchEtapa = async () => {
          try {
            const response = await axios.get(`${baseURL}/aprendizagem/getEtapa/${selectedObjAprendizagem}`);
            setObjAprenEtapa(response.data.data);
          } catch (error) {
            toast.error("Ocorreu um erro ao conectar ao servidor, tente novamente mais tarde")
          }
        };
        
        fetchEtapa();
      }, [selectedObjAprendizagem]); 

      const onChange = e => {
        if(e.target.name == 'num_vagas'){
            setInputs({ ...inputs, [e.target.name]: Number(e.target.value) });
        }
        setInputs({ ...inputs, [e.target.name]: e.target.value });
      }
     
   
      const CadastrarEncontro = async e => {
       
        e.preventDefault();
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
          id_componente_curricular,
          id_tipoObj_objApren_etapa
        } = inputs;
        const id_professora = user.id_professora;
        const id_area_conhecimento = selectedComponente;

        const createEncontro = async (dataInicial) => {
          try {
            const body = {
              titulo_encontro,
              descricao_encontro,
              criterios_avaliacao,
              sala,
              num_vagas,
              data_inicio: dataInicial,
              hora_inicio,
              hora_fim,
              repete,
              disponivel_inscricao,
              id_professora,
              id_area_conhecimento,
              id_componente_curricular,
              id_tipoObj_objApren_etapa
            };
      
            const response = await axios.post(`${baseURL}/encontros/create`, body, {
              headers: {
                "Content-type": "application/json"
              }
            });
      
            toast.success("Encontro criado com sucesso!");
            const timer = setTimeout(() => {
              navigate('/homeProfessor/gerenciarEncontro');
            }, 2200);
            
          } catch (err) {
            toast.error("Ocorreu um erro ao criar encontro, tente novamente!")
          }
        }
      
        if (repete === '1') {
          let dataInicial = data_inicio;
          for (let repeteEncontro = 0; repeteEncontro <= 1; repeteEncontro++) {
            await createEncontro(dataInicial);
            const novaData = moment(dataInicial, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
            dataInicial = novaData;
          }
          return;
        }
      
        if (repete === '2') {
          let dataInicial = data_inicio;
          for (let repeteEncontro = 0; repeteEncontro <= 2; repeteEncontro++) {
            await createEncontro(dataInicial);
            const novaData = moment(dataInicial, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
            dataInicial = novaData;
          }
          return;
        }
      
        if (repete === '3') {
          let dataInicial = data_inicio;
          for (let repeteEncontro = 0; repeteEncontro <= 3; repeteEncontro++) {
            await createEncontro(dataInicial);
            const novaData = moment(dataInicial, 'YYYY-MM-DD').add(7, 'days').format('YYYY-MM-DD');
            dataInicial = novaData;
          }
          return;
        }
      
        await createEncontro(data_inicio);
      }
   
      function formatText(textString){
        if (textString.length > 160) {
            const truncatedText = textString.slice(0, 160);
            return truncatedText + "...";
          }
          return textString;
      }
      
    return(
        <>
        <Container className="mt-5">
        <div className="d-flex flex-row justify-content-between align-items-center mb-3">
            <div>
            <h1 className="h1-homeProfessor">Cadastrar novo Encontro</h1>
            </div>
            <div className="mt-2 d-flex flex-row">
                <Button variant="success" className="me-3 p-2 btn-homeProfessor" href="/homeProfessor/gerenciarEncontro">
                Gerenciar meus Encontros
                </Button>
                <Button variant="success" className="btn-homeProfessor p-2" href="/homeProfessor/EncontrosCadastrados">
                Todos Encontros
                </Button>
            </div>
                    
                
                </div>
           
            <Row className="container-cadastrar">
              
                <h2 className="h2-cadastro">Cadastrar Encontro</h2>

            <Form onSubmit={CadastrarEncontro}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="titulo-encontro">
                        <Form.Label>Título do Encontro</Form.Label>
                        <Form.Control type="text" required placeholder="Digite aqui"  name="titulo_encontro"  onChange={onChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="disponivel_inscricao" className="inscricao">
                        <Form.Label>Disponível para Inscrição?</Form.Label>
                        <Form.Select required name="disponivel_inscricao"  onChange={onChange}>
                        <option value="">Selecione</option>

                            <option value="Sim">Sim</option>
                            <option value="Não">Não</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="id_area_conhecimento">
                      <Form.Label>Area de conhecimento:</Form.Label>
                        <Form.Select required name="id_area_conhecimento" 
                         value={selectedComponente}
                         onChange={e => setSelectedComponente(e.target.value)}
                       >

                            <option value="1">Base de Autonomia e Emancipação</option>
                            <option value="2">Ciências da Natureza e suas Tecnologias </option>
                            <option value="3">Ciências Humanas e Sociais Aplicadas </option>
                            <option value="4">Conhecimentos da Área Técnica </option>
                            <option value="5">Língua Portuguesa e suas Literaturas </option>
                            <option value="6">Linguagens e suas Tecnologias </option>
                            <option value="7">Matemática e suas Tecnologias </option>
                            <option value="8">Oficina de Línguas Estrangeiras </option>
                            <option value="9">Oficinas da Área Técnica </option>
                            <option value="10">Oficinas Livres do Ensino Médio</option>
                            <option value="11">Projetos Integradores </option>
                        </Form.Select>

                          
                    </Form.Group>
                    <Form.Group as={Col} controlId="id_componente_curricular">
                      <Form.Label>Componente Curricular:</Form.Label>
                        <Form.Select name="id_componente_curricular"
                         onChange={onChange}
                       >
                            <option value="">Selecione</option>
                            <option value="17">Não se aplica</option>
                            <option value="1">Artes Cênicas</option>
                            <option value="2">Artes Visuais</option>
                            <option value="3">Biologia</option>
                            <option value="4">Dança</option>
                            <option value="5">Educação Física</option>
                            <option value="6">Filosofia</option>
                            <option value="7">Física</option>
                            <option value="8">Geografia</option>
                            <option value="9">História</option>
                            <option value="10">Língua Espanhola e suas literaturas</option>
                            <option value="11">Língua Inglesa e suas literaturas</option>
                            <option value="12">Língua Portuguesa e suas literaturas</option>
                            <option value="13">Matemática</option>
                            <option value="14">Música</option>
                            <option value="15">Química</option>
                            <option value="16">Sociologia</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
         
                <Row className="mb-3">   
                    <Form.Group as={Col} controlId="criterios_avaliacao">
                      <Form.Label>Critérios de Avaliação:</Form.Label>
                        <Form.Control as="textarea" placeholder="Critérios de Avaliação" name="criterios_avaliacao" onChange={onChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="descricao">                     
                      <Form.Label>Descrição do Encontro:</Form.Label>
                       <Form.Control as="textarea" placeholder="Descrição" name="descricao_encontro" onChange={onChange} />
                    </Form.Group>
                </Row>
                   
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="data-inicio">
                      <Form.Label>Data de início:</Form.Label>
                        <Form.Control type="date" required name="data_inicio" onChange={onChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="data-fim">
                        <Form.Label>Hora de Início:</Form.Label>
                        <Form.Control type="time" required name="hora_inicio"  onChange={onChange}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="data-fim">
                        <Form.Label>Hora de Fim:</Form.Label>
                        <Form.Control required type="time" name="hora_fim"  onChange={onChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="repete" >
                        <Form.Label>Encontro se repete?</Form.Label>
                        <Form.Select name="repete" required onChange={onChange}>
                        <option value="">Selecione</option>
                        <option value="Não">Não</option>
                            <option value="1"> + Uma vez</option>
                            <option value="2"> + Duas vezes</option>
                            <option value="3"> + Três vezes</option>
                 
                        </Form.Select>
                    </Form.Group>
                </Row>
    
                <Row className="mb-3">
                {/* <Form.Group as={Col} controlId="tipo_objetivo">
                        <Form.Label>Tipo de Objetivo:</Form.Label>
                     <Form.Select >
                            <option value=''>Selecione</option>
                            {objAprendizagem.filter((aprendizagem, index, self) => 
                            index === self.findIndex((t) => t.tipo_objetivos === aprendizagem.tipo_objetivos)
                            )
                            .map((aprendizagem) => (
                            <option key={aprendizagem.id_tipo_objetivos} value={aprendizagem.id_tipo_objetivos}>
                                {aprendizagem.tipo_objetivos}
                            </option>
                            ))
                        }
                          </Form.Select> 
                    </Form.Group>   */}
                 
                    <Form.Group as={Col} controlId="objetivos_aprendizagem" className="">
                        {/* vem do banco */}
                        <Form.Label>Objetivo De aprendizagem:</Form.Label>
                        <Form.Select required 
                        value={selectedObjAprendizagem}
                        onChange={e => setSelectedObjAprendizagem(e.target.value)}>
                        <option value=''>Selecione</option>
                      
                        {objAprendizagem.filter((aprendizagem, index, self) => 
                        index === self.findIndex((t) => t.objetivo_aprendizagem === aprendizagem.objetivo_aprendizagem)
                        )
                      .map((aprendizagem) => (
                        <option key={aprendizagem.id_objetivo_aprendizagem} value={aprendizagem.id_objetivo_aprendizagem}>
                          {formatText(aprendizagem.objetivo_aprendizagem)}
                        </option>
                        ))}
                      </Form.Select>
                   
                    </Form.Group>

                    <Form.Group as={Col} controlId="etapa">
                        <Form.Label>Etapa:</Form.Label>
                        <Form.Select 
                        name='id_tipoObj_objApren_etapa'
                        onChange={onChange}
                        >
                            <option value="">Selecione</option>
                             {objAprenEtapa?.map((etapa) => (
                            <option key={etapa.id_etapa} value={etapa.id_tipoobj_objapren_etapa}>
                                {formatText(etapa.etapa)}
                            </option>
                            ))
                        }
                            </Form.Select>
                    </Form.Group>
                    
                </Row>             
                    
                   
            
                <Row className="mb-3 mt-3">
                    <Form.Group as={Col} controlId="num_vagas" >
                        <Form.Label>Número de vagas:</Form.Label>
                        <Form.Control type="number" required  name="num_vagas"  onChange={onChange}/>
                    </Form.Group>

                    <Form.Group as={Col}  controlId="sala-encontro" >
                        <Form.Label>Sala:</Form.Label>
                        <Form.Control type="text" required placeholder="Digite a sala e o bloco"  name="sala" onChange={onChange} />
                    </Form.Group>
                    
                </Row>
                

                    <Button variant="primary" type="submit" style={{backgroundColor:'#004d2a', border:'none'}} className="w-100 p-2 mb-2 mt-3">Cadastrar Encontro</Button>
                    <Button variant="primary" type="reset" style={{backgroundColor:'#870303', border:'none'}} className="w-100 p-2">Limpar</Button>
            </Form>
           
               
            </Row>
        
        </Container>
        </>
    )
}