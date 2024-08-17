import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { countries } from '../../../../shared/utils/countries';
import { AddService } from '../../services/add.service';
import { Router, RouterModule } from '@angular/router';
import { Client } from '../../models/addClient.model';
import { mapClientFormToClient } from '../../services/add-form-mappers';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

interface Country {
  name: string;
  code: string;
}

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PanelModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    SplitterModule,
    AccordionModule,
    DropdownModule,
    InputTextModule,
    TooltipModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;

  countries: Country[] = countries;

  selectedCountry: Country | undefined;

  constructor(
    private fb: FormBuilder,
    private addService: AddService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      personalNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[-+()0-9]+$'),
          Validators.maxLength(9),
        ],
      ],
      emailAddress: [
        '',
        [
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
        ],
      ],
      country: [''],
      city: [''],
      street: [''],
      postalCode: [''],
    });
  }

  ngOnInit(): void {
    this.countries = countries;
  }

  onSubmitClient(): void {
    if (this.clientForm.valid) {
      const client: Client = mapClientFormToClient(this.clientForm.value);

      this.addService.addClient(client).subscribe({
        next: (response: Client) => {
          console.log('Client added successfully', response);
          this.router.navigate(['/']);
        },
        error: (error: string) => {
          console.error('There was an error!', error);
        },
      });
    } else {
      console.log('Client Form is not valid');
      this.clientForm.markAllAsTouched();
    }
  }

  get name() {
    return this.clientForm.get('name');
  }
}
