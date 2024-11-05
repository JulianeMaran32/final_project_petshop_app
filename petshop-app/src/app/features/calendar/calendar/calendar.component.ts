import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../../core/services/logger.service';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AppointmentResponse } from '../../../shared/models/appointment/appointment-response.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [LoggerService, AppointmentService]
})
export class CalendarComponent implements OnInit, AfterViewInit {

  @ViewChild('fullCalendar') fullCalendar!: FullCalendarComponent;

  displayDialog: boolean = false;
  newEvent: any = {};
  selectedEvent: any = {};
  eventSources: EventSourceInput[] = [];
  calendarOptions!: CalendarOptions;

  constructor(
    private logger: LoggerService,
    private appointmentService: AppointmentService
  ) {
    this.logger.info('CalendarComponent instanciado');
  }

  ngOnInit(): void {
    this.logger.debug('ngOnInit chamado');
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      timeZone: 'America/Sao_Paulo',
      locale: 'pt-br',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      views: {
        dayGridPlugin: {
          titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
          dayHeaderFormat: { weekday: 'short', month: 'numeric', day: 'numeric' },
        },
        list: {
          titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
          dayHeaderFormat: { weekday: 'short', month: 'numeric', day: 'numeric' },
        }
      },
      slotLabelInterval: '01:00:00',
      slotDuration: '00:30:00',
      slotMinTime: '08:00:00',
      slotMaxTime: '18:00:00',
      businessHours: [
        {
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '08:00',
          endTime: '18:00'
        },
        {
          daysOfWeek: [6],
          startTime: '08:00',
          endTime: '14:00'
        }
      ],
      eventDurationEditable: false,
      eventResizableFromStart: false,
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Dia'
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

    this.loadAppointments();
  }

  ngAfterViewInit() {
    this.logger.debug('ngAfterViewInit chamado');
    this.updateEventSources();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments().subscribe((appointments: AppointmentResponse[]) => {
      const events = appointments.map(appointment => ({
        id: appointment.id.toString(), // Convertendo id para string
        title: `Pet ID: ${appointment.pet_id} | Veterinarian: ${appointment.veterinarian}`,
        start: `${appointment.date}T${appointment.time}`,
        end: `${appointment.date}T${appointment.time}`,
        description: appointment.description
      }));
      this.eventSources.push({ events });
      this.updateEventSources();
    });
  }

  handleSelect(selectInfo: any) {
    this.logger.info('Intervalo selecionado', selectInfo);
    alert(`Intervalo selecionado: ${selectInfo.startStr} até ${selectInfo.endStr}`);
  }

  handleDateClick(dateClickInfo: any) {
    this.logger.info('Intervalo clicado', dateClickInfo);
    alert(`Intervalo clicado: ${dateClickInfo.dateStr}`);
  }

  handleEventClick(info: any) {
    this.logger.info('Evento clicado', info);
    this.selectedEvent = {
      ...info.event.extendedProps,
      start: info.event.start,
      end: info.event.end,
      title: info.event.title
    };
    this.displayDialog = true;
  }

  customEventClassNames(arg: any) {
    this.logger.debug('Adicionando classes CSS personalizadas aos eventos', arg);
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
    this.logger.debug('viewDidMount chamado');
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
    this.logger.debug('Personalizando o conteúdo HTML dos eventos', arg);
    return { html: `<b>${arg.event.title}</b><br><i>${arg.event.start.toLocaleTimeString()}</i>` };
  }

  customEventDidMount(arg: any) {
    this.logger.debug('Aplicando lógica adicional ou estilos após a renderização dos eventos', arg);
    if (arg.event.extendedProps.type === 'block') {
      arg.el.style.backgroundColor = 'red';
      arg.el.style.borderColor = 'red';
    }
  }

  addEvent() {
    this.logger.info('Botão Agendar clicado');
    alert('Botão Agendar clicado!');
  }

  showAddEventDialog() {
    this.logger.info('Exibindo diálogo para adicionar evento');
    this.newEvent = {
      title: '',
      start: '',
      end: '',
      color: '',
      extendedProps: {
        pet: ''
      }
    };
    this.displayDialog = true;
  }

  saveNewEvent(event: any) {
    this.logger.info('Salvando novo evento', event);
    this.displayDialog = false;
  }

  cancelNewEvent() {
    this.logger.info('Cancelando novo evento');
    this.displayDialog = false;
  }

  deleteEvent() {
    this.logger.info('Deletando evento', this.selectedEvent);
    const calendarApi = this.fullCalendar.getApi();
    const calendarEvent = calendarApi.getEventById(this.selectedEvent.id);
    if (calendarEvent) {
      calendarEvent.remove();
    }
    this.displayDialog = false;
  }

  blockAgenda() {
    this.logger.info('Bloqueando agenda');
    const start = prompt('Digite a data e hora de início do bloqueio (YYYY-MM-DDTHH:MM:SS)');
    const end = prompt('Digite a data e hora de término do bloqueio (YYYY-MM-DDTHH:MM:SS)');
    if (start && end) {
      this.addEventSource([
        { title: 'Bloqueado', start, end, type: 'block' }
      ]);
    }
  }

  addEventSource(events: any[]) {
    this.logger.info('Adicionando fonte de eventos', events);
    this.eventSources.push({ events });
    this.updateEventSources();
  }

  removeEventSource(index: number) {
    this.logger.info('Removendo fonte de eventos', index);
    this.eventSources.splice(index, 1);
    this.updateEventSources();
  }

  updateEventSources() {
    this.logger.debug('Atualizando fontes de eventos');
    const calendarApi = this.fullCalendar.getApi();
    calendarApi.removeAllEventSources();
    this.eventSources.forEach(source => calendarApi.addEventSource(source));
  }

  updateEvent(event: any) {
    this.logger.info('Atualizando evento', event);
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
    this.logger.info('Salvando evento', event);
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
    this.logger.info('Cancelando evento', event);
    const calendarApi = this.fullCalendar.getApi();
    const calendarEvent = calendarApi.getEventById(event.id);
    if (calendarEvent) {
      calendarEvent.remove();
    }
    this.displayDialog = false;
  }

}
