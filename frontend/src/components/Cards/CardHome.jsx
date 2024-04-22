import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import './CardHome.css'
import { toast } from 'react-toastify';

import { useEffect, useState, useContext} from 'react';

import axios from 'axios';

const baseURL = 'https://inova-if-api.vercel.app'
export default function CardHome({ user }){

const [encontrosHoje, setEncontrosHoje] = useState([]);
const currentDate = new Date(); // Get the current date in JavaScript
const dataHoje = currentDate.toISOString().split('T')[0]; // Format the date as 'YYYY-MM-DD'
  useEffect(() => {
    const fetchEncontros = async () => {
      
      try {
        const response = await axios.get(`${baseURL}/agenda/encontroHoje/${user}/${dataHoje}`);
      
        setEncontrosHoje(response.data.data);
        if(response.data.msg == "Não encontros para data de hoje"){
          toast.info("Não há encontros marcados para hoje!")

        }
      } catch (error) {
        toast.error("Ocorreu um erro ao conectar ao servidor, tente novamente mais tarde!")
      }
    };
    if(user){
      fetchEncontros();

    }
  }, [user, dataHoje]); 

  const removerInscricao = async (id_inscricao, hora_inicio) => {
 
    const horaAtual = new Date().getHours();
    const mm = Number(hora_inicio.toString().slice(0,2))
      if (horaAtual <= mm) {
        try {
          const response = await axios.delete(`${baseURL}/inscricao/deleteinscricao/${id_inscricao}`);
          toast.success("Inscrição excluída com sucesso!")
          //limpa o card que foi excluido
          const updatedEncontrosInscritos = encontrosHoje?.filter(item => item.id_inscricao !== id_inscricao);
          setEncontrosHoje(updatedEncontrosInscritos);
        } catch (error) {
          toast.error("Ocorreu um erro ao excluir inscrição, tente novamente");
          
        }
      
      } else {
        toast.info("Encontro não pode ser cancelado pois já foi iniciado ou finalizado!")
      }
    
}

  function formatDate(dateString) {
    const datePart = dateString.substring(0, 10);
    const parts = datePart.split("-")
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
    return(
        <>
        {/* verificar se esta vazio */}
        {encontrosHoje && encontrosHoje.length > 0 ? (
        <Row lg={3} md={2} sm={1} className="g-4">
          {encontrosHoje.map((encontro, index) => (
            <Col key={index}>
              <Card className='cardHome-container'>
                <Card.Header className='d-flex justify-content-end card-header'>{index + 1}</Card.Header>
                <Card.Body>
                  <Card.Title className='py-1 '>{encontro.titulo_encontro}</Card.Title>
                  <ListGroup className="list-group-flush">
                  <ListGroup.Item className="px-1">Componente Curricular: <span>{encontro.componente_curricular}</span></ListGroup.Item>
                  <ListGroup.Item className="px-1">Descrição: <span>{encontro.descricao_encontro}</span></ListGroup.Item>
                  <ListGroup.Item className="px-1">Critérios de Avaliação: <span>{encontro.criterios_avaliacao}</span></ListGroup.Item>
                    <ListGroup.Item className="px-1">Data: <span>{formatDate(encontro.data_inicio)}</span></ListGroup.Item>
                    <ListGroup.Item className="px-1">Horários: <span>{encontro.hora_inicio}</span> até <span>{encontro.hora_fim}</span></ListGroup.Item>
                    <ListGroup.Item className="px-1">Sala: <span>{encontro.sala}</span></ListGroup.Item>
                    <ListGroup.Item className="px-1">Professora(o): <span>{encontro.nome_professora}</span></ListGroup.Item>
                  </ListGroup>
                  <Button variant="danger" className='mt-2' onClick={() => removerInscricao(encontro.id_inscricao, encontro.hora_inicio)}>
                  <i className="bi bi-trash p-1"></i>
                  Cancelar Inscrição
                </Button>
                </Card.Body>
              </Card>
          
            </Col>
              ))}
               </Row>
            ) : (
              <p>Não há encontros para hoje.</p>
            )}
    </>
  );
}