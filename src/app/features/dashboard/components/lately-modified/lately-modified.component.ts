import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { DashboardService } from '../../services/dashboard.service';
import { Information } from '../../models/information.model';
import { ItemHistoryRegister } from '../../../add/models/addItem';
import { operationTypes } from '../../../../shared/utils/operationTypes';

@Component({
  selector: 'app-lately-modified',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule],
  templateUrl: './lately-modified.component.html',
  styleUrls: [
    './lately-modified.component.css',
    '../../dashboard.component.css',
  ],
})
export class LatelyModifiedComponent implements OnInit {
  latelyModifiedItems: any[] = [];
  operationTypes = operationTypes;

  responsiveOptions: any[] | undefined;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getUserLastModificatedItemsHistory();

    this.responsiveOptions = [
      {
        breakpoint: '1500px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1100px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '1050px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getUserLastModificatedItemsHistory() {
    this.dashboardService.getUserLastModificatedItemsHistory().subscribe({
      next: (lastModifiedItems: ItemHistoryRegister[]) => {
        this.latelyModifiedItems = lastModifiedItems;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    })
  }
}
