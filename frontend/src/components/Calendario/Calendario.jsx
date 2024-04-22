import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import brLocales from '@fullcalendar/core/locales/pt-br';
import './Calendario.css'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


export default function Calendario(events){
    return(
        <>
         <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={false}
            events={events}
            eventContent={renderEventContent}
            locale={brLocales}
            headerToolbar={{
                start: "today prev,next",
                center:"title",
                end: "dayGridMonth,dayGridWeek,dayGridDay"
                ,
            }}
            
          />
        </>
    )
}

//formatar data do americano para brasileiro
function formatDate(dateString) {
  const datePart = dateString.substring(0, 10);
  const parts = datePart.split("-")
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}
//funçao que renderiza o conteúdo na tela
function renderEventContent(eventInfo) {
  const event = eventInfo.event;
  const extendedProps = event.extendedProps;
  const background = extendedProps.backgroundColor;

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className='popover-header'>{event.title}</Popover.Header>
      <Popover.Body className='popover-body'>
      <p>Data: <strong> {formatDate(extendedProps.dataInicio)}</strong></p>
      <p>Horário:<strong> {extendedProps.horaInicio}</strong> até <strong>{extendedProps.horaFim}</strong></p>
      <p>Componente: <strong>{extendedProps.componente}</strong></p>
      <p>Sala: <strong>{extendedProps.sala}</strong></p>
      <p>Professora(o): <strong>{extendedProps.professora}</strong></p>
      <p>Descrição do Encontro: <strong>{extendedProps.descricao}</strong></p>
      <p>Avaliação: <strong>{extendedProps.criterios}</strong></p>
      </Popover.Body>
    </Popover>
  );
    return (
      <>
      <OverlayTrigger  placement="bottom" overlay={popover} delay={{ show: 250, hide: 400 }}>
        <h6 style={{ background, color:'#fff' }}>{event.title}<i className="bi bi-caret-down-fill px-1"></i></h6>
      </OverlayTrigger>
      
      </>
    )
  }
  