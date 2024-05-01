import LogoLogin from '../../assets/Img/LogoLogin.png'
import './Sobre.css'


export default function Sobre(){
    return(
        <>
        <section className='section-sobre'>
        <h1 className='h1-sobre'>Inova IF - Módulo Agenda</h1>
        <div className='box-sobre'> 
            
            <img src={LogoLogin} alt=""/>
            {/* <h2>Contextualização</h2> */}
            <p>O Curso Técnico em Eventos Integrado ao Ensino Médio (EMI-Eventos)  do Instituto Federal de Brasília (IFB) vem, desde 2017, fazendo essa transição do paradigma da instrução para o da Aprendizagem (INSTITUTO FEDERAL DE BRASÍLIA, 2023; PACHECO, 2019), assim como em várias escolas do Brasil e do mundo. Hoje, no curso, 12 horas são de atividades não-seriadas, onde as alunas escolhem as oficinas que irão cursar e 16 horas seguem seriadas (INSTITUTO FEDERAL DE BRASÍLIA, 2023). 
           </p>
           
            <p> O curso inovador de eventos tem como elemento norteador a autonomia da aluna no seu processo de aprendizagem e o uso educacional da tecnologia como ferramenta essencial para o desenvolvimento da aluna (PACHECO, 2019; TESSARO, 2018, FELIX, 2022).</p>
            <p>Há cinco anos (INSTITUTO FEDERAL DE BRASÍLIA, 2023), o EMI Eventos funciona dentro de um sistema de gerenciamento educacional tradicional, onde são feitas pequenas adaptações para contemplá-lo que, no entanto, não dão conta de todas as suas demandas, o que gera sobrecarga dos docentes. </p>
            <p>Esta experiência demonstra que é inviável inovar sem transformar também a estrutura operacional dos cursos que se pretendem inovadores. Para seguir no caminho da inovação, é necessário pensar em um sistema que atenda as demandas deste novo modelo de organização: acompanhamento de percursos individuais de aprendizagem, grupos não seriados e autonomia para as estudantes.</p>
            <p>Para pensar neste software, pesquisadores do Instituto Federal do Triângulo Mineiro – Campus Avançado Uberaba Parque Tecnológico – vêm desenvolvendo o aplicativo Inova IF em parceria com o IFB. Objetiva-se que a ferramenta possa ser utilizada em outros espaços educativos que estejam em transição para este mesmo paradigma inovador.</p>
            <p>A partir do contexto da pandemia ocasionada pelo vírus Sars-CoV-2, intensificaram-se ações de atualização docente devido à necessidade de ser repensado o sistema educativo brasileiro.</p>
            <p>Educadores diversos encontraram-se nesses espaços para observância de ações de inovação educacional necessárias. Em um desses momentos, docentes do Instituto Federal do Triângulo Mineiro (IFTM) e do Instituto Federal de Brasília (IFB) se encontraram e perceberam que a demanda de um poderia encontrar solução no outro. Destarte, estabeleceu-se uma parceria entre dois campi dos respectivos Institutos a fim de que as ações do IFB relativas à inovação educacional deste último com a migração de um de seus cursos técnicos integrados para o Paradigma da Aprendizagem. 
</p>
            <p>No intuito do IFTM de compreender e visualizar a migração de um curso do Paradigma da Instrução para o Paradigma da Aprendizagem e no intuito do IFB em ter um aplicativo que auxiliasse na sua gestão de inovação educacional, foi realizada uma parceria de forma com que o IFTM passou ao papel de desenvolvedor de módulos do aplicativo para gerenciamento dessa educação inovadora e o IFB passou ao papel de fornecedor de demandas e análise de requisitos. O projeto iniciou-se em 2021 na forma de Projeto de Pesquisa dentro do IFTM, no qual esboços de telas e entendimento de algumas das demandas foram realizadas. </p>
            <p>Diante da necessidade da equipe pedagógica do curso Ensino Médio Integrado a Eventos (EMI-Eventos) do Instituto Federal de Brasília (IFB) de avançar no desenvolvimento de artefatos para ajudar no gerenciamento das ofertas das aulas, facilitar o processo de matrícula e permitir um maior controle da distribuição das atividades de cada aluna. Nessa direção foi iniciado, em parceria com a equipe de professores e alunas do curso Superior de Tecnologia em Sistemas para Internet do IFB, um estudo sobre o módulo de Agenda que ainda não havia sido desenvolvido no projeto inicial com o IFTM.
</p>
            <p>O objetivo principal do projeto é desenvolver artefatos para o módulo agenda  INOVA IF - sistema de gerenciamento educacional para cursos inovadores baseado na experiência de reconfiguração pedagógica do EMI-Eventos do IFB. O desenvolvimento deste sistema permitirá que as alunas coloquem em prática os conhecimentos e habilidades desenvolvidos na sua formação.</p>
            <h2>Referências</h2>
            <div className='referencias_sobre'>
            <p>FELIX, C.; FERNANDES, C. O futuro da educação é on-line? Discussão sobre tecnologia e educação a partir de uma visão crítica. Acervo, [S. l.], v. 35, n. 1, p. 1–14, 2022. Disponível em: https://revista.an.gov.br/index.php/revistaacervo/article/view/1776. Acesso em: 28 set. 2023.</p>
            <p>INSTITUTO FEDERAL DE BRASÍLIA. Plano de Curso Técnico em Eventos Integrado ao Ensino Médio. Brasília, 2023. Disponível em: https://www.ifb.edu.br/attachments/article/33357/Plano%20de%20Curso%20T%C3%A9cnico%20em%20Eventos%20Integrado%20ao%20Ensino%20M%C3%A9dio.pdf. Acesso em: 25 ago. 2023.</p>
           <p>PACHECO, J.. Inovar é assumir um compromisso ético com a educação. São Paulo: Vozes, 2019.</p>
           <p>TESSARO, F. O.; FAORO, R. R.; MIRI. D. H.; GILBERT, V. S.; FRIZZO, P.  V.; FOCHESATTO, L. B.; MATTE, J.; CHAIS, C.; GANZER P. P.; OLEA, P.  M.. A Tecnologia da Informação na Educação: uma Revisão Bibliográfica. XVII  Mostra de Iniciação Cientifica, Pós-Graduação, Pesquisa e Extensão. Programa de Pós Graduação em Administração – UCS. Nov. 2018. Disponível em: http://www.ucs.br/etc/conferencias/index.php/mostraucsppga/xviiimostrappga/paper/viewFile/5941/2041 Acesso em 09 Set. 2023. </p>
            </div>
            <button className='a-sobre'><a href='/'>VOLTAR</a></button>
            
        </div>
        </section>
        
        </>
    )
}