import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ImgHome from '../../assets/Img/ImgHome.png'
import './Welcome.css'

export default function Welcome({ children }){
    return(
        <>
        <Container >
          <Row>
            <Col className='mt-1'>
            <div className=''>
                <h5 className='ps-1 mb-3 h5-welcome'>Seja Bem-vindo ao</h5>
                <h1 className='welcome-titulo'>InovaIF</h1>
                <p className='mt-4 ps-1 p-welcome'> O InovaIF é uma ferramenta que simplifica o agendamento e a gestão de atividades acadêmicas, permitindo às estudantes se inscreverem em encontros com apenas alguns cliques. Essa funcionalidade promove uma melhor organização e transparência, ao oferecer uma visão centralizada de todos os encontros disponíveis e das inscrições realizadas pela estudante. Assim, facilita o acompanhamento e a participação qualificada de todas as envolvidas neste momento de aprendizagem. </p>
                {children}
            </div>
            </Col>
            <Col className='hide-img-home mt-2 ms-5'>
            <div className='ms-5'>
                <Image src={ImgHome} fluid />
            </div>
            </Col>
          </Row>
      </Container>
       
        </>
    )
}