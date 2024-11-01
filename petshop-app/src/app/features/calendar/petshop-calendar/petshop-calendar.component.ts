import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import { PanelModule } from 'primeng/panel';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-petshop-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    FullCalendarModule,
    PanelModule,
    EventDialogComponent,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './petshop-calendar.component.html',
  styleUrls: ['./petshop-calendar.component.scss']
})
export class PetshopCalendarComponent implements OnInit {
  
  @ViewChild('fullCalendar') fullCalendar!: FullCalendarComponent;
  @ViewChild(EventDialogComponent) eventDialog!: EventDialogComponent;

  displayDialog: boolean = false; // Propriedade para exibir ou ocultar o modal
  newEvent: any = {}; // Propriedade para armazenar o novo evento
  selectedEvent: any = {}; // Propriedade para armazenar o evento selecionado
  eventSources: EventSourceInput[] = [];
  calendarOptions!: CalendarOptions;

  constructor() { }

  ngOnInit() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      locale: 'pt-br',
      timeZone: 'America/Sao_Paulo',
      slotLabelInterval: '01:00:00', // Frequência dos rótulos dos intervalos de tempo (1 hora)
      slotDuration: '00:30:00', // Duração de cada intervalo de tempo (30 minutos)
      slotMinTime: '08:00:00', // Horário mínimo
      slotMaxTime: '20:00:00', // Horário máximo
      businessHours: [
        {
          daysOfWeek: [1, 2, 3, 4, 5], // Segunda a Sexta
          startTime: '09:00',
          endTime: '12:00' // Antes do almoço
        },
        {
          daysOfWeek: [1, 2, 3, 4, 5], // Segunda a Sexta
          startTime: '13:00',
          endTime: '18:00' // Após o almoço
        },
        {
          daysOfWeek: [6], // Sábado
          startTime: '09:00',
          endTime: '12:00' // Antes do almoço
        },
        {
          daysOfWeek: [6], // Sábado
          startTime: '13:00',
          endTime: '15:00' // Após o almoço
        }
      ],
      eventDurationEditable: false,
      eventResizableFromStart: false,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,addEventButton,blockAgendaButton',
      },
      customButtons: {
        addEventButton: {
          text: 'Agendar',
          click: this.showAddEventDialog.bind(this)
        },
        blockAgendaButton: {
          text: 'Bloquear Agenda',
          click: this.blockAgenda.bind(this)
        }
      },
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia',
      },
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      dayMaxEventRows: 3,
      weekNumberCalculation: 'local',
      eventSources: this.eventSources, // Definindo as fontes de eventos
      select: this.handleSelect.bind(this),
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventClassNames: this.customEventClassNames.bind(this),
      eventContent: this.customEventContent.bind(this),
      eventDidMount: this.customEventDidMount.bind(this),
      viewDidMount: this.viewDidMount.bind(this) 
    };

    // Adicionando uma fonte de eventos inicial
    this.eventSources.push({
      events: [
        { id: '7', title: 'Rian | Consulta', start: '2024-10-28T10:30:00', end: '2024-10-28T11:00:00', color: 'blue' },
        { id: '8', title: 'Suzi | Vacina', start: '2024-10-28T11:00:00', end: '2024-10-28T11:30:00', color: 'yellow' }
      ]
    });
  }

  ngAfterViewInit() {
    this.updateEventSources();
  }

  handleSelect(selectInfo: any) {
    // Lógica para manipular a seleção de intervalo de tempo
    alert(`Intervalo selecionado: ${selectInfo.startStr} até ${selectInfo.endStr}`);
  }

  handleDateClick(dateClickInfo: any) {
    // Lógica para manipular o clique em intervalo de tempo
    alert(`Intervalo clicado: ${dateClickInfo.dateStr}`);
  }

  handleEventClick(info: any) {
    // Lógica para manipular o clique em evento
    this.selectedEvent = { 
      ...info.event.extendedProps, 
      start: info.event.start, 
      end: info.event.end, 
      title: info.event.title 
    };
    this.eventDialog.mode = 'edit';
    this.displayDialog = true;
  }

  customEventClassNames(arg: any) {
    // Adiciona classes CSS personalizadas aos eventos com base no tipo de evento
    switch (arg.event.extendedProps.type) {
      case 'banho-tosa':
        return ['event-banho-tosa'];
      case 'banho':
        return ['event-banho'];
      case 'tosa':
        return ['event-tosa'];
      case 'consulta':
        return ['event-consulta'];
      case 'vacina':
        return ['event-vacina'];
      case 'block':
        return ['event-block'];
      default:
        return [];
    }
  }

  viewDidMount() {
    // Adiciona a classe custom-button aos botões personalizados
    const addEventButton = document.querySelector('.fc-addEventButton-button');
    if (addEventButton) {
      addEventButton.classList.add('custom-button');
    }
  
    const blockAgendaButton = document.querySelector('.fc-blockAgendaButton-button');
    if (blockAgendaButton) {
      blockAgendaButton.classList.add('custom-button');
    }
  }
  
  customEventContent(arg: any) {
    // Personaliza o conteúdo HTML dos eventos
    return { html: `<b>${arg.event.title}</b><br><i>${arg.event.start.toLocaleTimeString()}</i>` };
  }

  customEventDidMount(arg: any) {
    // Aplica lógica adicional ou estilos após a renderização dos eventos
    if (arg.event.extendedProps.type === 'block') {
      arg.el.style.backgroundColor = 'red';
      arg.el.style.borderColor = 'red';
    }
  }

  addEvent() {
    // Lógica para adicionar um evento
    alert('Botão Agendar clicado!');
  }

  showAddEventDialog() {
    this.newEvent = {
      title: '',
      start: '',
      end: '',
      color: '',
      extendedProps: {
        pet: ''
      }
    };
    this.eventDialog.mode = 'add';
    this.displayDialog = true;
  }

  saveNewEvent(event: any) {
    if (this.eventDialog.mode === 'add') {
      this.addEventSource([event]);
    } else {
      this.updateEvent(event);
    }
    this.displayDialog = false;
  }

  cancelNewEvent() {
    this.displayDialog = false;
  }

  deleteEvent() {
    const calendarApi = this.fullCalendar.getApi();
    const calendarEvent = calendarApi.getEventById(this.selectedEvent.id);
    if (calendarEvent) {
      calendarEvent.remove();
    }
    this.displayDialog = false;
  }

  blockAgenda() {
    // Lógica para bloquear a agenda
    const start = prompt('Digite a data e hora de início do bloqueio (YYYY-MM-DDTHH:MM:SS)');
    const end = prompt('Digite a data e hora de término do bloqueio (YYYY-MM-DDTHH:MM:SS)');
    if (start && end) {
      this.addEventSource([
        { title: 'Bloqueado', start, end, type: 'block' }
      ]);
    }
  }

  addEventSource(events: any[]) {
    this.eventSources.push({ events });
    this.updateEventSources();
  }

  removeEventSource(index: number) {
    this.eventSources.splice(index, 1);
    this.updateEventSources();
  }

  updateEventSources() {
    const calendarApi = this.fullCalendar.getApi();
    calendarApi.removeAllEventSources();
    this.eventSources.forEach(source => calendarApi.addEventSource(source));
  }

  updateEvent(event: any) {
    const calendarApi = this.fullCalendar.getApi();
    const calendarEvent = calendarApi.getEventById(event.id);
    if (calendarEvent) {
      calendarEvent.setProp('title', event.title);
      calendarEvent.setStart(event.start);
      calendarEvent.setEnd(event.end);
      calendarEvent.setExtendedProp('pet', event.extendedProps.pet);
      calendarEvent.setExtendedProp('client', event.extendedProps.client);
      calendarEvent.setExtendedProp('service', event.extendedProps.service);
      calendarEvent.setExtendedProp('professional', event.extendedProps.professional);
      calendarEvent.setExtendedProp('status', event.extendedProps.status);
      calendarEvent.setExtendedProp('notes', event.extendedProps.notes);
      calendarEvent.setExtendedProp('attachments', event.extendedProps.attachments);
      calendarEvent.setExtendedProp('reminders', event.extendedProps.reminders);
      calendarEvent.setExtendedProp('tags', event.extendedProps.tags);
      calendarEvent.setExtendedProp('history', event.extendedProps.history);
    }
  }

  saveEvent(event: any) {
    // Lógica para salvar o evento
    const calendarApi = this.fullCalendar.getApi();
    const calendarEvent = calendarApi.getEventById(event.id);
    if (calendarEvent) {
      calendarEvent.setProp('title', event.title);
      calendarEvent.setStart(event.start);
      calendarEvent.setEnd(event.end);
      calendarEvent.setExtendedProp('pet', event.pet);
    }
    this.displayDialog = false;
  }

  cancelEvent(event: any) {
    // Lógica para cancelar o evento
    const calendarApi = this.fullCalendar.getApi();
    const calendarEvent = calendarApi.getEventById(event.id);
    if (calendarEvent) {
      calendarEvent.remove();
    }
    this.displayDialog = false;
  }

  /**
   * 1. Adicionar um novo evento
   * 2. Atualizar um evento
   * 3. Excluir um evento
   * 4. Duração de um evento = 30min
   * 5. Horários: 09:00 às 18:00 (Segunda a Sexta) e 09:00 às 14:00 (Sábado)
   * 6. Eventos: Banho e Tosa, Banho, Tosa, Consulta, Vacina
   * 7. Cores: Banho e Tosa (Verde), Banho (Verde Claro), Tosa (Laranja), Consulta (Azul), Vacina (Amarelo)
   * 8. Exibir a hora no formato 24h
   * 9. Exibir data e hora no formato dd/MM/yyyy HH:mm (Ex: 28/10/2024 10:00)
   * 10. Exibir o nome do evento no tooltip
   * 11. Exibir o nome do evento no título da página
   * 12. Dias da semana em Português: Domingo, Segunda, Terça, Quarta, Quinta, Sexta, Sábado
   * 13. Meses em Português: Janeiro, Fevereiro, Março, Abril, Maio, Junho, Julho, Agosto, Setembro, Outubro, Novembro, Dezembro
   * 14. Adicionar um botão para adicionar um novo evento
   * 15. Para o formulário de agendamento (adicionar / editar) abrir um modal/dialog
   * 16. Exibir um campo para selecionar o tipo de evento (Banho e Tosa, Banho, Tosa, Consulta, Vacina), data e hora de início e fim
   * 17. Exibir um campo para selecionar o pet (Nome, Raça, Idade, Peso, Porte)
   * 18. Exibir um campo para selecionar o cliente (Nome, CPF, Telefone, E-mail)
   * 19. Exibir um campo para selecionar o serviço (Nome, Preço, Duração)
   * 20. Exibir um campo para selecionar o profissional (Nome, CPF, Telefone, E-mail)
   * 21. Exibir um campo para selecionar o status do evento (Agendado, Em andamento, Concluído, Cancelado)
   * 22. Exibir um campo para adicionar observações
   * 23. Exibir um campo para adicionar anexos (Fotos, Vídeos, Documentos)
   * 24. Exibir um campo para adicionar lembretes (E-mail, SMS, WhatsApp)
   * 25. Exibir um campo para adicionar tags (Cores, Etiquetas)
   * 26. Exibir um campo para adicionar histórico (Data, Hora, Evento, Observações)
   */
  
}
