import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { RecordsService } from '../../services/records.service';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientFormComponent } from '../../../add/components/client-form/client-form.component';
import { PersonsRegister } from '../../models/person-register.model';
import { Router, RouterModule } from '@angular/router';
import { Person } from '../../../add/models/Persons.model';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    ButtonModule,
    ClientFormComponent,
    ConfirmDialogModule,
    CommonModule,
    DialogModule,
    PanelModule,
    PaginatorModule,
    RouterModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TriStateCheckboxModule,
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
  providers: [ConfirmationService, MessageService],
})
export class RecordsComponent implements OnInit {
  personsRegister: PersonsRegister[] = [];
  personForEdit?: Person;

  visible: boolean = false;

  selectedClient!: PersonsRegister;

  first: number = 0;
  rows: number = 10;

  constructor(
    private recordsService: RecordsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClientsRegisterList();
  }

  confirmBlacklistAction(event: Event) {
    let header: string;
    let message: string;
    let icon: string;

    if (this.selectedClient.blacklistFlag) {
      header = `Czy na pewno chcesz odblokować '${this.selectedClient.name}'`;
      message = `Przywrócisz możliwość przeprowadzania transakcji z użytkownikiem`;
      icon = 'pi-lock-open';
    } else {
      header = `Czy na pewno chcesz zablokować '${this.selectedClient.name}'`;
      message = `Przeprowadzenie transkacji z tym użytkownikiem stanie się niemożliwe`;
      icon = 'pi-lock';
    }

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: header,
      message: message,
      icon: icon,
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });

        this.updateBlacklistStatus();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  updateBlacklistStatus() {
    this.recordsService
      .updateBlacklistStatus(
        this.selectedClient.id,
        this.selectedClient.blacklistFlag
      )
      .subscribe({
        next: () => {
          console.log('Usuwanie w toku');
        },
        error: (err: any) => console.error('Napotkano błąd: ' + err),
        complete: () => console.log('Usunięto pomyślnie'),
      });
  }

  showEditDialog() {
    this.visible = true;

    this.getPerson();
    console.log(this.selectedClient);
  }

  getPerson() {
    this.recordsService.getPerson(this.selectedClient.id).subscribe({
      next: (person: Person) => {
        this.personForEdit = person;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }

  confirmArchiveAction(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: `Czy na pewno chcesz zarchiwizować "${this.selectedClient.name}"`,
      message: `Tej operacji nie możesz cofnąć`,
      icon: 'pi-folder-open',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  navigateToClientHistory() {
    return this.router.navigate(['client-history'], {
      state: { id: this.selectedClient.id },
    });
  }

  getClientsRegisterList() {
    this.recordsService.getPersons().subscribe({
      next: (personRegisterList: PersonsRegister[]) => {
        this.personsRegister = personRegisterList;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }
}
