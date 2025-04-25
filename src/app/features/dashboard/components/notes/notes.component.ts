import { Component, OnInit } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    InputTextareaModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css', '../../dashboard.component.css'],
})
export class NotesComponent implements OnInit {
  notesContent!: string;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getUserNotes();
  }

  getUserNotes() {
    this.dashboardService.getUserNotes().subscribe({
      next: (notes: any) => {
        this.notesContent = notes.notes;
      },
      error: (err: any) => console.error('Błąd: ' + err),
      complete: () => console.log('Wszystko ok'),
    });
  }

  updateUserNotes() {
    debugger;
    this.dashboardService.updateUserNotes(this.notesContent).subscribe({
      next: () => {
        console.log('Trwa aktualizowane');
      },
      error: (err: any) => console.error('Napotkano błąd: ' + err),
      complete: () => console.log('Notatki zaktualizowane'),
    });
  }
}
