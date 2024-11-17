import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ClientRegisterShortComponent } from '../../../add/components/client-register-short/client-register-short.component';
import { Person, PersonForSearch } from '../../../add/models/Persons.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [ClientRegisterShortComponent, ButtonModule, CommonModule, DialogModule, InputTextModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './add-user-form.component.html',
  styleUrl: './add-user-form.component.css',
})
export class AddUserFormComponent implements OnInit {
  userForm!: FormGroup;

  selectedPerson?: PersonForSearch;

  clientRegisterShortVisible: boolean = false;



  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      person: ['', Validators.required],
    });
  }

  onPersonSelect(person: PersonForSearch) {
    this.selectedPerson = person;
    this.clientRegisterShortVisible = false;
  }

  showClientRegisterShort() {
    this.clientRegisterShortVisible = true;
  }
}
