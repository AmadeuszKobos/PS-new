import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [InputTextareaModule, ReactiveFormsModule, ButtonModule ],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css', '../../dashboard.component.css']
})
export class NotesComponent {

}
