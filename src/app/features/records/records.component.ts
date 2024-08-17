import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { RecordsService } from './services/records.service';
import { PersonsRegister } from './models/person-register.model';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ClientFormComponent } from '../add/components/client-form/client-form.component';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ClientFormComponent,
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
})
export class RecordsComponent implements OnInit {
  personsRegister: PersonsRegister[] = [];

  visible: boolean = false;

  selectedClient!: any;

  first: number = 0;
  rows: number = 10;

  constructor(private recordsService: RecordsService) {}

  ngOnInit(): void {
    this.getClientsRegisterList();
  }

  showDialog() {
    this.visible = true;

    //this.getItem();
    console.log(this.selectedClient)
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
