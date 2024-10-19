import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { itemStatuses } from '../../../../shared/utils/itemStatuses';
import { conditionStates } from '../../../../shared/utils/conditionStates';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WarehouseService } from '../../services/warehouse.service';
import { ItemHistory, ItemHistoryRegister } from '../../../add/models/addItem';
import { operationTypes } from '../../../../shared/utils/operationTypes';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-item-history',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PanelModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.css'],
})
export class ItemHistoryComponent implements OnInit {
  itemHistories: ItemHistoryRegister[] = [];

  conditionStates = conditionStates;
  operationTypes = operationTypes;

  first: number = 0;
  rows: number = 10;

  constructor(
    private router: Router,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit(): void {
    this.getItemHistory(history.state.id);
  }

  getItemHistory(itemId: number) {
    this.warehouseService.getItemHistory(itemId).subscribe({
      next: (itemHistories: ItemHistoryRegister[]) => {
        console.log('Pobrane dane:', itemHistories); // Sprawdź, czy dane są pobierane
        this.itemHistories = itemHistories;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }

  returnToWarehouse() {
    return this.router.navigate(['/warehouse']);
  }
}
