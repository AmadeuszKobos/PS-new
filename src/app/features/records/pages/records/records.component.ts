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
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
  providers: [ConfirmationService, MessageService],
})
export class RecordsComponent implements OnInit {
  personsRegister: PersonsRegister[] = [];

  visible: boolean = false;

  selectedClient!: any;

  first: number = 0;
  rows: number = 10;

  constructor(
    private recordsService: RecordsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getClientsRegisterList();
  }

  confirmBlacklistAction(event: Event) {
    let header: string;
    let message: string;
    let icon: string;

    if(this.selectedClient.blacklistFlag)
    {
      header = `Czy na pewno chcesz odblokować '${this.selectedClient.name}'`;
      message = `Przywrócisz możliwość przeprowadzania transakcji z użytkownikiem`;
      icon = "pi-lock-open"
    }
    else
    {
      header = `Czy na pewno chcesz zablokować '${this.selectedClient.name}'`
      message = `Przeprowadzenie transkacji z tym użytkownikiem stanie się niemożliwe`;
      icon = "pi-lock"
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

  showDialog() {
    this.visible = true;

    //this.getItem();
    console.log(this.selectedClient);
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
    return this.router.navigate(['client-history'])
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
