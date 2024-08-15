import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { DropdownFilterOptions } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { mapItemFormToItem } from '../../services/add-form-mappers';
import { Item } from '../../models/addItem';
import { AddService } from '../../services/add.service';
import { OperationTypeEnum } from '../../../../shared/Enums/operation-type-enum.model';
import { conditionStates } from '../../../../shared/utils/conditionStates';

@Component({
  selector: 'app-add-item-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PanelModule,
    InputTextModule,
    InputTextareaModule,
    SplitterModule,
    InputGroupModule,
    InputGroupAddonModule,
    RadioButtonModule,
    ButtonModule,
    ToastModule,
    CommonModule,
    DropdownModule,
  ],
  templateUrl: './add-item-form.component.html',
  styleUrl: './add-item-form.component.css',
})
export class AddItemFormComponent implements OnInit, OnChanges {
  @Input() addMode: boolean = false;
  @Input() editMode: boolean = false;
  @Input() itemForEdit?: Item;

  currentMode!: OperationTypeEnum;
  itemForm: FormGroup;

  itemConditionStatus = conditionStates;

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
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required]],
      producer: [''],
      description: [''],
      operationType: [OperationTypeEnum.Pawn, [Validators.required]],
      cost: [''],
      days: [''],
      clientId: ['', [Validators.required]],
      conditionId: [],
      // uploadImage: [],
    });
  }

  ngOnInit() {
    // Blokowanie pól dla różnych operacji
    this.itemForm
      .get('operationType')
      ?.valueChanges.subscribe((operationType) => {
        const daysControl = this.itemForm.get('days');

        if (operationType === OperationTypeEnum.Pawn) {
          daysControl?.clearValidators();
          daysControl?.enable();
        } else {
          daysControl?.setValidators([Validators.required]);
          daysControl?.disable();
        }

        daysControl?.updateValueAndValidity();
      });

    if (this.editMode) {
      this.itemForm.get('clientId')?.disable();
      this.itemForm.get('days')?.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.itemForEdit)
    {
      this.itemForm.patchValue(this.itemForEdit)
    }
  }

  onSubmitItem(): void {
    if (this.itemForm.valid) {
      const item: Item = mapItemFormToItem(this.itemForm.value);

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
    }
  }
}
