import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { itemStatuses } from '../../../../shared/utils/itemStatuses';
import { conditionStates } from '../../../../shared/utils/conditionStates';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-history',
  standalone: true,
  imports: [CommonModule, RouterModule, PanelModule, TableModule, ButtonModule],
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.css'],
})
export class ItemHistoryComponent {
  itemHistories: any[] = [];

  itemStatuses = itemStatuses;
  conditionStates = conditionStates;

  first: number = 0;
  rows: number = 10;

  constructor(private router: Router) {}

  returnToWarehouse() {
    return this.router.navigate(['/warehouse']);
  }
}
