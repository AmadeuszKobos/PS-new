import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { RecordsService } from './services/records.service';
import { PersonsRegister } from './models/person-register.model';

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [CommonModule, PanelModule, PaginatorModule, TableModule],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements OnInit{
  personsRegister: PersonsRegister[] = [];

  constructor(private recordsService: RecordsService) {}
  
  first: number = 0;
  rows: number = 10;

  ngOnInit(): void {
    this.getClientsRegisterList();
  }

  getClientsRegisterList(){
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
