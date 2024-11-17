import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { countries } from '../../../../shared/utils/countries';
import { AddService } from '../../services/add.service';
import { Router, RouterModule } from '@angular/router';
import { Person } from '../../models/Persons.model';
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
import { ErrorMessageService } from '../../../../shared/services/error-message.service';
import { InputMaskModule } from 'primeng/inputmask';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { NotificationService } from '../../../../shared/notification/notification.service';

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
    InputMaskModule,
    ButtonModule,
    SplitterModule,
    AccordionModule,
    DropdownModule,
    InputTextModule,
    TooltipModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css',
  providers: [NotificationService]
})
export class ClientFormComponent implements OnInit, OnChanges {
  @Input() editMode: boolean = false;
  @Input() PersonForEdit?: Person;

  clientForm!: FormGroup;
  addressFormActive: boolean = false;

  tooltips: { [key: string]: string } = {};

  countries: Country[] = countries;

  selectedCountry: Country | undefined;

  constructor(
    private fb: FormBuilder,
    private addService: AddService,
    private router: Router,
    private errorMessageService: ErrorMessageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.countries = countries;

    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      personalNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          CustomValidators.phoneValidator(),
          Validators.minLength(9),
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
      country: [countries.find((x) => x.name == 'Polska')],
      city: [''],
      street: [''],
      postalCode: [''],
    });

    if (this.editMode) {
      this.clientForm.get('name')?.disable();
      this.clientForm.get('surname')?.disable();
      this.clientForm.get('personalNumber')?.disable();

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.PersonForEdit) {
      this.clientForm.patchValue(this.PersonForEdit);
    }
  }

  onSubmitClient(): void {
    if (this.clientForm.valid) {
      const client: Person = mapClientFormToClient(
        this.clientForm.value,
        this.PersonForEdit?.addressId || 0,
        this.PersonForEdit?.personId || 0
      );

      this.addService.addClient(client).subscribe({
        next: (response: Person) => {
          this.notificationService.showSuccess('Dodawanie pomyślnie', 'Dodano nowego klienta do bazy')
          this.router.navigate(['/']);
        },
        error: (error: string) => {
          this.notificationService.showError('Błąd podczas dodawania', error);
        },
      });
    } else {
      console.log('Client Form is not valid');
      this.clientForm.markAllAsTouched();

      if (this.clientForm) {
        Object.keys(this.clientForm.controls).forEach((field) => {
          const control = this.clientForm.get(field);
          if (control?.hasError) {
            control.markAsDirty();
          }
        });
      }
    }
  }

  setAddressValidators() {
    if (!this.addressFormActive) {
      this.clientForm.get('country')?.setValidators([Validators.required]);
      this.clientForm.get('city')?.setValidators([Validators.required]);
      this.clientForm.get('street')?.setValidators([Validators.required]);
      this.clientForm.get('postalCode')?.setValidators([Validators.required]);
    } else {
      this.clientForm.get('country')?.clearValidators();
      this.clientForm.get('city')?.clearValidators();
      this.clientForm.get('street')?.clearValidators();
      this.clientForm.get('postalCode')?.clearValidators();
    }

    this.clientForm.get('country')?.updateValueAndValidity();
    this.clientForm.get('city')?.updateValueAndValidity();
    this.clientForm.get('street')?.updateValueAndValidity();
    this.clientForm.get('postalCode')?.updateValueAndValidity();

    this.addressFormActive = !this.addressFormActive;
  }

  getError(field: string, form: FormGroup = this.clientForm): string {
    return this.errorMessageService.getError(field, form);
  }
}
