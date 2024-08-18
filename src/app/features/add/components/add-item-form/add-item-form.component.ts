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
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { mapItemFormToItem } from '../../services/add-form-mappers';
import { Item } from '../../models/addItem';
import { AddService } from '../../services/add.service';
import { OperationTypeEnum } from '../../../../shared/Enums/operation-type-enum.model';
import { conditionStates } from '../../../../shared/utils/conditionStates';
import { ErrorMessageService } from '../../../../shared/services/error-message.service';
import { TooltipModule } from 'primeng/tooltip';
import { RoundValueDirective } from '../../../../shared/directives/round-to.directive';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClientRegisterShortComponent } from '../client-register-short/client-register-short.component';
import { PersonForSearch } from '../../models/Persons.model';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    ClientRegisterShortComponent,
    DropdownModule,
    DialogModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextareaModule,
    InputTextModule,
    PanelModule,
    RadioButtonModule,
    ReactiveFormsModule,
    RoundValueDirective,
    SplitterModule,
    ToastModule,
    TooltipModule,
  ],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.css',
  providers: [ConfirmationService, MessageService],
})
export class AddItemFormComponent implements OnInit, OnChanges {
  @Input() addMode: boolean = false;
  @Input() editMode: boolean = false;
  @Input() itemForEdit?: Item;

  currentMode!: OperationTypeEnum;
  itemForm!: FormGroup;

  clientSearchValue: string = '';

  clientRegisterShortVisible: boolean = false;

  itemConditionStatus = conditionStates;

  selectedPerson!: PersonForSearch;

  selectedCondition: {
    name: string;
    conditionId: number;
    value: string;
    icon: string;
    color: string;
  } = this.itemConditionStatus[0];

  operationTypes = [
    { name: 'Zastaw', value: OperationTypeEnum.Pawn },
    { name: 'Sprzedaż', value: OperationTypeEnum.Sale },
  ];

  constructor(
    private fb: FormBuilder,
    private addService: AddService,
    private router: Router,
    private errorMessageService: ErrorMessageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required]],
      conditionId: [, [Validators.required]],
      producer: [''],
      description: ['', [Validators.maxLength(50)]],
      operationType: [OperationTypeEnum.Pawn, [Validators.required]],
      cost: ['', [Validators.required]],
      days: ['', [Validators.required]],
      client: ['', [Validators.required]],
      // uploadImage: [],
    });

    // Blokowanie pól dla różnych operacji
    this.itemForm
      .get('operationType')
      ?.valueChanges.subscribe((operationType) => {
        const daysControl = this.itemForm.get('days');

        if (operationType === OperationTypeEnum.Pawn) {
          daysControl?.setValidators([Validators.required]);
          daysControl?.enable();
        } else {
          daysControl?.removeValidators([Validators.required]);
          daysControl?.disable();
          daysControl?.setValue('');
        }

        daysControl?.updateValueAndValidity();
      });

    if (this.editMode) {
      this.itemForm.get('clientId')?.disable();
      this.itemForm.get('days')?.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.itemForEdit) {
      this.itemForm.patchValue(this.itemForEdit);
    }
  }

  openPersonsForSearch() {
    this.clientRegisterShortVisible = true;
  }

  onPersonSelect(person: PersonForSearch) {
    this.selectedPerson = person;
    this.clientRegisterShortVisible = false;
    this.itemForm.get('client')?.setValue(this.selectedPerson.name + ' ' + this.selectedPerson.surname) 
  }

  onSubmitItem(): void {

    const item: Item = mapItemFormToItem(this.itemForm.value, this.selectedPerson.personId);
    debugger  
    console.log(item);

    if (this.itemForm.valid) {


      this.addService.addItem(item).subscribe({
        next: (response: Item) => {
          console.log('Item added successfully', response);
          this.router.navigate(['/']);
        },
        error: (error: string) => {
          console.error('There was an error!', error);
        },
      });
    } else {
      console.log('Item Form is not valid');
      this.itemForm.markAllAsTouched();

      if (this.itemForm) {
        Object.keys(this.itemForm.controls).forEach((field) => {
          const control = this.itemForm.get(field);
          if (control?.hasError) {
            control.markAsDirty();
          }
        });
      }
    }
  }

  getError(field: string, form: FormGroup = this.itemForm): string {
    return this.errorMessageService.getError(field, form);
  }
}
