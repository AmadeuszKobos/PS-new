import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { RecordsService } from '../../services/records.service';
import { ItemHistory, ItemHistoryRegister } from '../../../add/models/addItem';
import { conditionStates } from '../../../../shared/utils/conditionStates';
import { operationTypes } from '../../../../shared/utils/operationTypes';
import { IconField, IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-client-history',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    PanelModule,
    TableModule,
    ButtonModule,
    RouterModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
  ],
  templateUrl: './client-history.component.html',
  styleUrl: './client-history.component.css',
})
export class ClientHistoryComponent implements OnInit {
  personHistories: ItemHistoryRegister[] = [];

  personName =
    this.personHistories.length > 0 ? this.personHistories[0] : 'BRAK HISTORII';

  conditionStates = conditionStates;
  operationTypes = operationTypes;

  first: number = 0;
  rows: number = 10;

  constructor(private router: Router, private recordsService: RecordsService) {}

  ngOnInit(): void {
    this.getItemHistory(history.state.id);
  }

  getItemHistory(itemId: number) {
    this.recordsService.getPersonItemHistory(itemId).subscribe({
      next: (personHistories: ItemHistoryRegister[]) => {
        console.log('Pobrane dane:', personHistories); // Sprawdź, czy dane są pobierane
        this.personHistories = personHistories;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }

  returnToRecords() {
    return this.router.navigate(['records']);
  }
}
