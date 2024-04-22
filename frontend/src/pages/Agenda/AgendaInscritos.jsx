import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Calendario from '../../components/Calendario/Calendario.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { useEffect, useState, useContext} from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext.jsx'
import axios from 'axios';

const baseURL = 'https://inova-if-api.vercel.app'


export default function AgendaInscritos(){
  const { user } = useContext(UserContext);

    //   async function findUserLoggedAluno(){
    //     try {
    //       const response = await userLogged();
    //       setUser(response.data);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   useEffect(() => {
    //     if (localStorage.getItem("token")) findUserLoggedAluno();
    //   }, []);

     
      const[dataEncontroInscrito, setDataEncontroInscrito] = useState([]);

      useEffect(() =>{
        const fetchDataEncontroInscrito = async() => {
          try{
            const response = await axios.get(`${baseURL}/agenda/dataInscrito/${user.id_aluna}`);
            // console.log(response)
            setDataEncontroInscrito(response.data.data)
            if(response.data.msg == "Não há encontros inscritos agendado"){
              toast.info("Não há encontros inscritos")
    
            }
           
          }catch(error){
            toast.error("Ocorreu um erro ao conectar ao servidor, tente novamente mais tarde!")
            
          }
        }
        if(user){
            fetchDataEncontroInscrito();
        }
         
      }, [user.id_aluna])

        const dadosEncontrosInscritos =  dataEncontroInscrito && dataEncontroInscrito.map((event) => {
          return {
            title: event.titulo_encontro,
            start: event.data_inicio,
            end: event.data_inicio,    
            backgroundColor: '#4d0043',
            borderColor:'#4d0043',
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
        <Row className='mt-5 row-calender'>
          <h2 style={{color:'#2B9EB3'}}>Encontros Inscritos</h2>
          <Col >
            <Calendario events={dadosEncontrosInscritos} />
          </Col>
        </Row>
    </Container>
    <Footer/>
   </>
    )
}