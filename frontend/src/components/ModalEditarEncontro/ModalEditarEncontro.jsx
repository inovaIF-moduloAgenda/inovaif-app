import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import { toast } from "react-toastify";
import { useEffect, useState} from 'react';
const baseURL = 'https://inova-if-api.vercel.app'

export default function ModalEditarEncontro({ showEdit, modalOpen, dataEncontro, onUpdateEncontro}){
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
        id_tipoobj_objApren_etapa:""
      });


    const [objAprendizagem, setObjAprendizagem] = useState([]);
    const [selectedObjAprendizagem, setSelectedObjAprendizagem] = useState('');
    const [objAprenEtapa, setObjAprenEtapa] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
      if (dataEncontro) {
        setInputs({
          id_encontro: dataEncontro.id_encontro,
          titulo_encontro: dataEncontro.titulo_encontro,
          descricao_encontro: dataEncontro.descricao_encontro,
          criterios_avaliacao: dataEncontro.criterios_avaliacao,
          sala: dataEncontro.sala,
          num_vagas: dataEncontro.num_vagas,
          data_inicio: dataEncontro.data_inicio,
          hora_inicio: dataEncontro.hora_inicio,
          hora_fim: dataEncontro.hora_fim,
          disponivel_inscricao: dataEncontro.disponivel_inscricao,
          id_componente_curricular: dataEncontro.id_componente_curricular,
          tipo_objetivos: dataEncontro.tipo_objetivos,
          id_area_conhecimento: dataEncontro.id_area_conhecimento,
          id_objetivo_aprendizagem: dataEncontro.id_objetivo_aprendizagem,
          objetivo_aprendizagem: dataEncontro.objetivo_aprendizagem,
          id_etapa: dataEncontro.id_etapa,
          etapa: dataEncontro.etapa,
          id_tipoobj_objApren_etapa: dataEncontro.id_tipoobj_objapren_etapa
        });
        setModalIsOpen(true)
      }
      
    }, [dataEncontro]);

    useEffect(() => {
      if (modalIsOpen && dataEncontro) {
      const fetchHaveInscritos = async () => {

        try {
          const response1 = await axios.get(`${baseURL}/inscricao/contadorNumVagas/${inputs.id_encontro}`);    
          const qtdInscritos = response1.data.data;  
          
          if (Number(qtdInscritos[0]) > 0) {
            setButtonDisabled(true);
            return
          } else {
            setButtonDisabled(false);
            return
          }
        } catch (error) {
       
          toast.error("Ocorreu um erro ao conectar no servidor.");
        }
      };
        fetchHaveInscritos();
    }
    }, [dataEncontro, modalIsOpen]);


      useEffect(() => {
        if (modalIsOpen && dataEncontro) {
          const fetchObjAprendizagem = async () => {
            try {
              const response = await axios.get(`${baseURL}/aprendizagem/getObjetivo/${inputs.id_area_conhecimento}`);
              setObjAprendizagem(response.data.data);
            } catch (error) {
              // console.error("Ocorreu uma erro ao conectar no servidor.");
              toast.error("Ocorreu um erro ao conectar no servidor.");
            }
          };
          fetchObjAprendizagem();
        }
      }, [modalIsOpen, dataEncontro, inputs.id_area_conhecimento]);

      useEffect(() => {
        if (selectedObjAprendizagem != '') {
        const fetchEtapa = async () => {
          try {
            const response = await axios.get(`${baseURL}/aprendizagem/getEtapa/${selectedObjAprendizagem}`);
            setObjAprenEtapa(response.data.data);
          } catch (error) {
            // console.error("Ocorreu uma erro ao conectar no servidor.");
            toast.error("Ocorreu uma erro ao conectar no servidor.");
          }
        };
        
        fetchEtapa();
        }
      }, [selectedObjAprendizagem, dataEncontro]); 

      //captura valores dos inputs
      const onChange = e => {
        if(e.target.name == 'id_tipoobj_objApren_etapa'){
          setInputs({ ...inputs, [e.target.name]: Number(e.target.value)});
      }
        setInputs({ ...inputs, [e.target.name]: e.target.value });
      }

      const UpdateEncontro = async e => {
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
            disponivel_inscricao,
            id_tipoobj_objApren_etapa
          } = inputs;
          try {
         
            const body = { titulo_encontro, descricao_encontro, criterios_avaliacao, sala, num_vagas, data_inicio, hora_inicio, hora_fim, disponivel_inscricao, id_tipoobj_objApren_etapa };
      
            const response = await axios.put(`${baseURL}/encontros/updateEncontro/${inputs.id_encontro}`, body, {
              headers: {
                "Content-type": "application/json"
              }
            }
            );
           
              toast.success("Atualização realizada com sucesso!")
              onUpdateEncontro(response.data.data);
          } catch (err) {
            // console.error("Ocorreu uma erro ao conectar no servidor.");
            toast.error("Ocorreu um erro ao atualizar encontro, tente novamente")
          }

      }
      function formatText(textString){
        if (textString?.length > 110) {
            const truncatedText = textString.slice(0, 110);
            return truncatedText + "...";
          }
          return textString;
      }
    return(
        <>
        <Modal     
          size="lg"
          backdrop="static"
          keyboard={false}
          show={showEdit} 
        >
          <Modal.Header >
              <Modal.Title>Editar Encontro</Modal.Title>
          </Modal.Header>
           <Modal.Body>
              <div>
                <Form onSubmit={UpdateEncontro}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="titulo-encontro">
                            <Form.Label>Título do Encontro</Form.Label>
                            <Form.Control type="text" 
                            required 
                            placeholder="Digite aqui"  
                            name="titulo_encontro"  
                            value={inputs.titulo_encontro}
                            onChange={onChange}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="disponivel_inscricao" className="inscricao">
                            <Form.Label>Disponível para Inscrição?</Form.Label>
                              <Form.Select 
                              required 
                              name="disponivel_inscricao"  
                              value={inputs.disponivel_inscricao}
                              onChange={onChange}>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                              </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3"><Form.Group as={Col} controlId="id_area_conhecimento">
                      <Form.Label>Area de conhecimento:</Form.Label>
                        <Form.Select 
                          required 
                          name="id_area_conhecimento" 
                          value={inputs.id_area_conhecimento}
                          disabled>
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
                                <Form.Select name='id_componente_curricular'
                                value={inputs.id_componente_curricular}
                                disabled
                                >
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
                                <Form.Control as="textarea" placeholder="Critérios de Avaliação" 
                                name="criterios_avaliacao" 
                                value={inputs.criterios_avaliacao}
                                onChange={onChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="descricao">                     
                              <Form.Label>Descrição do Encontro:</Form.Label>
                              <Form.Control as="textarea" placeholder="Descrição" name="descricao_encontro" 
                              
                              value={inputs.descricao_encontro}
                              onChange={onChange} />
                            </Form.Group>
                        </Row>
                          
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="data-inicio">
                              <Form.Label>Data de início:</Form.Label>
                                <Form.Control type="date" required 
                                name="data_inicio"
                                disabled={buttonDisabled}
                              value={inputs.data_inicio}
                                onChange={onChange}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="data-fim">
                                <Form.Label>Hora de Início:</Form.Label>
                                <Form.Control type="time" required 
                                name="hora_inicio" 
                                disabled={buttonDisabled}
                              value={inputs.hora_inicio}
                                onChange={onChange}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="data-fim">
                                <Form.Label>Hora de Fim:</Form.Label>
                                <Form.Control required type="time" 
                                name="hora_fim"  
                                disabled={buttonDisabled}
                                value={inputs.hora_fim}
                                onChange={onChange} />
                            </Form.Group>
                        </Row>
            
                        <Row className="mb-3">
                        {/* <Form.Group as={Col} controlId="tipo_objetivos">
                                <Form.Label>Tipo de Objetivo:</Form.Label>
                            <Form.Select >
                            <option value="">{inputs.tipo_objetivos}</option>
                                    {objAprendizagem?.filter((aprendizagem, index, self) => 
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
                                <Form.Label>Objetivo De aprendizagem:</Form.Label>
                                <Form.Select disabled
                                  value={selectedObjAprendizagem}
                                  onChange={e => setSelectedObjAprendizagem(e.target.value)}>
                                  <option value={inputs.id_objetivo_aprendizagem}>{inputs.objetivo_aprendizagem}</option>
                                    {objAprendizagem?.filter((aprendizagem, index, self) => 
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
                                name='id_tipoobj_objApren_etapa'
                                onChange={onChange}
                                disabled
                                >
                                    <option value={inputs.id_tipoobj_objApren_etapa}>{inputs.etapa}</option>
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
                                <Form.Control type="number" required  
                                name="num_vagas" 
                                value={inputs.num_vagas}
                                onChange={onChange}/>
                            </Form.Group>

                            <Form.Group as={Col}  controlId="sala-encontro" >
                                <Form.Label>Sala:</Form.Label>
                                <Form.Control type="text" required placeholder="Digite a sala e o bloco" 
                                name="sala" 
                                value={inputs.sala}
                                onChange={onChange} />
                            </Form.Group>
                            
                        </Row>
                            <Button variant="primary" type="submit" style={{backgroundColor:'#004d2a', border:'none'}} className="w-100 p-2 mb-2 mt-3" onClick={modalOpen}>Salvar Alterações</Button>
                            <Button variant="primary"  style={{backgroundColor:'#870303', border:'none'}} className="w-100 p-2" onClick={modalOpen}>Cancelar</Button>
                    </Form>
              </div>
            </Modal.Body>  
        </Modal>
        </>
    )
}