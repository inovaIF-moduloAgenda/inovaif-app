import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Welcome from '../../components/Welcome/Welcome';
import './HomeProfessor.css'
import Footer from '../../components/Footer/Footer';

export default function HomeProfessor(){
    return(
        <>
        <Container className='mt-5 container-homeProfessor'>
          <Welcome>
            <div className='div-homeProfessor d-flex flex-column'>
            <Button className="mt-2 btn-homeProfessor mb-3 p-2" variant="success" href='/homeProfessor/cadastrarEncontro'>Cadastrar Novo Encontro</Button>
            <Button className="mt-2 btn-homeProfessor mb-3 p-2" variant="success" href='/homeProfessor/gerenciarEncontro'>Gerenciar Meus Encontros</Button>
            <Button className="mt-2 btn-homeProfessor p-2" variant="success" href='/homeProfessor/encontrosCadastrados'>Verificar Todos Encontros</Button>
            </div>
            
          </Welcome>
      </Container>
       <Footer/>
        </>
    )
}