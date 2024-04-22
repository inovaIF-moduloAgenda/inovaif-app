import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Calendario from '../../components/Calendario/Calendario';
import Footer from '../../components/Footer/Footer';
// import { userLogged } from "../../Service/userservice.js";
import { useEffect, useState, useContext} from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext.jsx'
import axios from 'axios';

const baseURL = 'https://inova-if-api.vercel.app'


export default function Agenda(){
      // const { user, setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);

      // async function findUserLoggedAluno(){
      //   try {
      //     const response = await userLogged();
      //     setUser(response.data);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      // useEffect(() => {
      //   if (localStorage.getItem("token")) findUserLoggedAluno();
      // }, []);

      const[dataEncontroDisponivel, setDataEncontroDisponivel] = useState([]);

      useEffect( ()=>{
        const fetchDataEncontroDisponivel = async() =>{
          try{
            const response = await axios.get(`${baseURL}/agenda/datas/${user.id_aluna}`)
            // console.log(response)
            setDataEncontroDisponivel(response.data.data)
            if(response.data.msg == "Não há encontros disponiveis agendado"){
              toast.info("Não há encontros disponíveis!")
    
            }
          }catch(error){
            toast.error("Ocorreu um erro ao conectar ao servidor, tente novamente mais tarde!")
          }
        }
        if(user){
          fetchDataEncontroDisponivel();
        }
      }, [user.id_aluna]);

      //objeto para o calendario
        const events =  dataEncontroDisponivel && dataEncontroDisponivel.map((event) => {
          return {
            title: event.titulo_encontro,
            start: event.data_inicio,
            end:event.data_inicio,
            
            backgroundColor: '#02a059',
            borderColor:'#02a059',
           
            dataInicio: event.data_inicio,
            horaInicio:event.hora_inicio,
            horaFim:event.hora_fim,
            componente:event.componente_curricular,
            professora:event.nome_professora,
            sala:event.sala,
            descricao:event.descricao_encontro,
            criterios:event.criterios_avaliacao
          };
        });
      
  return (
        <>
          <Container fluid="md">
            <h1 style={{margin:'30px 0', color:'#004d2a', fontWeight:'bold', textAlign:'center'}}>Sua Agenda</h1>
              <Row >
                <h2 style={{color:'#2B9EB3'}}>Encontros Disponíveis</h2>
                <Col >
                  <Calendario events={events}/>
                </Col>
              </Row>
            
          </Container>
          <Footer/>
        </>
    )
}