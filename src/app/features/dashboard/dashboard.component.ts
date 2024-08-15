import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { NotesComponent } from './components/notes/notes.component';
import { LatelyModifiedComponent } from './components/lately-modified/lately-modified.component';
import { InformationsComponent } from './components/informations/informations.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    FieldsetModule,
    ReactiveFormsModule,
    AnalysisComponent,
    NotesComponent,
    LatelyModifiedComponent,
    InformationsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent  {

}
