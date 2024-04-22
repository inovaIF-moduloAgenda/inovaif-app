import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import  './index.css'
import Authentication from './pages/Authentication/Authentication.jsx'
import { NavbarC } from './components/Navbar/Navbar.jsx'
import Home from './pages/Home/Home.jsx'
import EncontrosDisponivel from './pages/EncontrosDisponiveis/EncontrosDisponivel.jsx'
import EncontrosInscritos from './pages/EncontrosInscritos/EncontrosInscritos.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import { NavbarProfessor } from './components/NavbarProfessor/NavbarProfessor.jsx'
import GerenciarEncontro from './pages/GerenciarEncontro/GerenciarEncontro.jsx'
import Agenda from './pages/Agenda/Agenda.jsx'
import Sobre from './pages/Sobre/Sobre.jsx'
import EncontrosCadastrados from './pages/EncontrosCadastrados/EncontrosCadastrados.jsx'
import UserProvider from './Context/UserContext.jsx'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AgendaInscritos from './pages/Agenda/AgendaInscritos.jsx'
import HomeProfessor from './pages/HomeProfessor/HomeProfessor.jsx'
import CadastrarEncontro from './pages/CadastrarEncontro/CadastrarEncontro.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Authentication/>,
    errorElement:<ErrorPage/>,
    
  },
  {
    path: '/sobre',
    element: <Sobre/>,
  },
  
  {
    path:"/home",
    element: <NavbarC/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/home",
        element:<Home/>,
      },
      {
        path:"/home/encontrosDisponivel",
        element:<EncontrosDisponivel/>
      },
      {
        path:"/home/encontrosInscritos",
        element:<EncontrosInscritos/>
      },
      {
        path:"/home/agenda",
        element:<Agenda/>
      },
      {
        path:"/home/agendaInscrito",
        element: <AgendaInscritos/>
      }
   
    ]
  },
  {
    path:"/homeProfessor",
    element: <NavbarProfessor/>,
    errorElement:<ErrorPage/>,
    children: [
      {
        path:"/homeProfessor",
        element: <HomeProfessor/>,
      },
      {
        path:"/homeProfessor/cadastrarEncontro",
        element: <CadastrarEncontro/>,
      },
      {
        path:"/homeProfessor/gerenciarEncontro",
        element: <GerenciarEncontro/>,
      },
      {
        path:"/homeProfessor/EncontrosCadastrados",
        element: <EncontrosCadastrados/>,
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={router} />
    <ToastContainer
     position="top-right"
     autoClose={2500}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="colored"
   
     />
    </UserProvider>
  </React.StrictMode>,
)
