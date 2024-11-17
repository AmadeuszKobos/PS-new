import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { NotesComponent } from './components/notes/notes.component';
import { LatelyModifiedComponent } from './components/lately-modified/lately-modified.component';
import { InformationsComponent } from './components/informations/informations.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NotificationService } from '../../shared/notification/notification.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AnalysisComponent,
    CommonModule,
    FieldsetModule,
    InformationsComponent,
    LatelyModifiedComponent,
    NotesComponent,
    PanelModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [MessageService, NotificationService]

})
export class DashboardComponent implements OnInit  {
  constructor(private notifactionService: NotificationService) {}
  
  ngOnInit(): void {
    this.notifactionService.flushMessages();
  }
}
