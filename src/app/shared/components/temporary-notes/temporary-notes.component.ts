import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-temporary-notes',
  standalone: true,
  imports: [FormsModule, InputTextareaModule],
  templateUrl: './temporary-notes.component.html',
  styleUrl: './temporary-notes.component.css',
})
export class TemporaryNotesComponent implements OnInit {
  notesContent: string = "";

  ngOnInit(): void {}
}
