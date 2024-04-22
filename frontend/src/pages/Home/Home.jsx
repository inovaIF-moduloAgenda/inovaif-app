import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './Home.css'
import CardHome from "../../components/Cards/CardHome";
import Welcome from "../../components/Welcome/Welcome";
import CalenderHome from '../../assets/Img/CalenderHome.png'
import Footer from '../../components/Footer/Footer';
import { useEffect, useContext} from 'react';
import { userLoggedProf } from "../../Service/userservice.js";
import { UserContext } from '../../Context/UserContext.jsx'

  export default function Home(){
          const { user, setUser } = useContext(UserContext);
          async function findUserLoggedProf(){
            try {
              const response = await userLoggedProf();
              setUser(response.data);
            } catch (error) {
              // console.log(error);
            }
          }
          useEffect(() => {
            if (localStorage.getItem("token")) findUserLoggedProf();
          }, []);

    return (
    <>
      
        <Container fluid className="box-container mt-5" >
          <Welcome>
            <p className='p-welcome'>Inscreva-se nos encontros disponibilizados pelas professoras no botão abaixo.</p>
            <Button className="mt-2 btn-home p-3" variant="success" href='/home/encontrosDisponivel'>Fazer inscrição no encontro</Button>
          </Welcome>
        </Container>
        <Container>
        <h2 className="mt-5 mb-4 h2-home">Agenda para Hoje</h2>

        <CardHome user={user?.id_aluna}/>

        </Container>
        
        <Container className="box-container mt-5">
          <h2 className='mt-5 mb-4 h2-home'>Todos Encontros</h2>
          <Row>
       
        <Col className='hide-img-home mt-2'>
        <div className='ms-3'>
            <Image src={CalenderHome} fluid />
        </div>
        </Col>
        <Col className='mt-5 d-flex flex-column align-items-center justify-content-center'>
        <div className='' >
            <h3 className='h3-home'>Sua Agenda</h3>
            <p className='mt-4 ps-1 p-home'>No sistema InovaIF, temos a funcionalidade que permite aos estudantes visualizarem rapidamente os encontros iminentes, facilitando a preparação e a coordenação de suas agendas. Confira os próximos encontros no botão abaixo.</p>
            <div>
            <Button className="mt-2 btn2-home p-2 me-3" variant="success" href='/home/agenda'>Agenda dos Encontros Disponíveis</Button>
            <Button className="mt-2 btn2-home p-2 " variant="success" href='/home/agendaInscrito'>Agenda dos Encontros Inscritos</Button>
            </div>
           
        </div>
        </Col>
      </Row>
        </Container>
        <Footer/>
    </>
    
    )
}