import logo from '../../assets/Img/LogoWhite.png'
import '../../App.jsx'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Outlet, useNavigate } from 'react-router-dom';
import UserLogo from '../../assets/Img/UserLogo.png'
import '../Navbar/Navbar.css'
import { useEffect, useContext} from 'react';
import { userLoggedProf } from "../../Service/userservice.js";
import { toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext.jsx'


export function NavbarProfessor(){
  const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    async function findUserLoggedProf(){
      try {
        const response = await userLoggedProf();
        setUser(response.data);
      } catch (error) {
        console.log(error);
        navigate("/");
        localStorage.removeItem("token");
        setUser(undefined);
        toast.info("Sessão Encerrada, faça login novamente")
      }
    }
 
      function signout() {
        localStorage.removeItem("token");
        setUser(undefined);
        navigate("/");
        toast.success("Logout com sucesso")
      }
      //VERIFICA SE O USUÁRIO TEM TOKEN
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && token!== '') {
          findUserLoggedProf();
        } else {
          navigate("/")
          toast.error("Acesso negado! Faça login corretamente.")
        }
      }, []);
    return (
       <>
          {['sm'].map((expand) => (
              <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 navStyle" >
                <Container >
                  <Navbar.Brand href="/homeProfessor">  
                  <div className="logo-inova">
                      <img src={logo} alt="Logo do inova if"/>
                  </div>
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="start"
                  >
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-end flex-grow-1 navLink">
                        <Nav.Link href="/homeProfessor">Início</Nav.Link>
                        <Nav.Link href="/homeProfessor/cadastrarEncontro">Novo Encontro</Nav.Link>
                        <Nav.Link href="/homeProfessor/gerenciarEncontro">Meus Encontros</Nav.Link>
                        <Nav.Link href="/homeProfessor/EncontrosCadastrados" className='me-2'>Encontros Cadastrados</Nav.Link>
                        {user ? (
                        <Dropdown className='dropdown-left'>
                          <Dropdown.Toggle  id="dropdown-basic" className='avatar-perfil'>
                            <img src={UserLogo} alt="raposa" className="user-img" ></img>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                          <Dropdown.Header>Nome:</Dropdown.Header>
                            <Dropdown.Item href="#" disabled> {user.nome_professora}</Dropdown.Item>
                            <Dropdown.Header>Matrícula:</Dropdown.Header>
                            <Dropdown.Item href="#" disabled>{user.mat_professora}</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={signout} ><i className="bi bi-box-arrow-right"></i>Sair</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <Dropdown className='dropdown-left'>
                        <Dropdown.Toggle  id="dropdown-basic" className='avatar-perfil'>
                          <img src={UserLogo} alt="raposa" className="user-img" ></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={signout} ><i className="bi bi-box-arrow-right"></i>Sair</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      )}
                      </Nav>
                      
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
              </Navbar>
            
            ))}


            <Outlet/>
       </>
   )
}