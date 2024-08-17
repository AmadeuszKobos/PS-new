import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-client-history',
  standalone: true,
  imports: [CommonModule, PanelModule, TableModule, ButtonModule, RouterModule],
  templateUrl: './client-history.component.html',
  styleUrl: './client-history.component.css',
})
export class ClientHistoryComponent {
  clientHistory: any[] = []; //todo: uzupełnić modelem

  first: number = 0;
  rows: number = 10;

  constructor(private router: Router) {}

  returnToRecords() {
    return this.router.navigate(['records'])
  }
}
