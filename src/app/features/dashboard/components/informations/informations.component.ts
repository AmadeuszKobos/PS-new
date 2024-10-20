import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { FieldsetModule } from 'primeng/fieldset';
import { DashboardService } from '../../services/dashboard.service';
import { Information } from '../../models/information.model';

@Component({
  selector: 'app-informations',
  standalone: true,
  imports: [CommonModule, CarouselModule, FieldsetModule],
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css', '../../dashboard.component.css'],
})
export class InformationsComponent implements OnInit {
  informations: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getLastInformations();
  }

  getLastInformations() {
    this.dashboardService.getLastInformations().subscribe({
      next: (informations: Information[]) => {
        this.informations = informations;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }
}
