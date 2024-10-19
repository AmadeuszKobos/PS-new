import { Component, OnInit } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [InputTextareaModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css', '../../dashboard.component.css'],
})
export class NotesComponent implements OnInit {
  notesContent!: String;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getUserNotes();

  }

  getUserNotes() {
    this.dashboardService.getUserNotes().subscribe({
      next: (notes: any) => {
        debugger
        this.notesContent = notes.notes 
      },
      error: (err: any) => console.error('Błąd: ' + err),
      complete: () =>
        console.log('Wszystko ok'),
    })
  }

}
