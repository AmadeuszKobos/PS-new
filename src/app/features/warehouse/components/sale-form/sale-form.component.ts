import { CommonModule } from '@angular/common';
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
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { ErrorMessageService } from '../../../../shared/services/error-message.service';
import { DialogModule } from 'primeng/dialog';
import { ClientRegisterShortComponent } from '../../../add/components/client-register-short/client-register-short.component';
import { PersonForSearch } from '../../../add/models/Persons.model';
import { AddService } from '../../../add/services/add.service';
import { Item, ItemForSale as ItemForSale } from '../../../add/models/addItem';
import { mapSaleFormToItemForSale } from '../../../add/services/add-form-mappers';
import { Router, RouterModule } from '@angular/router';
import { RoundValueDirective } from '../../../../shared/directives/round-to.directive';
import { ItemRegister } from '../../models/item-register.model';
import { WarehouseService } from '../../services/warehouse.service';

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    PanelModule,
    ReactiveFormsModule,
    RouterModule,
    TooltipModule,
    DialogModule,
    ClientRegisterShortComponent,
    RoundValueDirective,
  ],
  templateUrl: './sale-form.component.html',
  styleUrl: './sale-form.component.css',
})
export class SaleFormComponent implements OnInit, OnChanges {
  @Input() itemForSale?: ItemRegister;
  @Input() priceSuggestion?: number;
  @Input() handoverMode?: boolean;

  saleForm: FormGroup;

  clientRegisterShortVisible: boolean = false;

  selectedPerson!: PersonForSearch;

  constructor(
    private fb: FormBuilder,
    private errorMessageService: ErrorMessageService,
    private warehouse: WarehouseService,
    private router: Router
  ) {
    this.saleForm = this.fb.group({
      name: ['', Validators.required],
      person: ['', Validators.required],
      transactionAmount: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.saleForm.get('name')?.setValue(this.itemForSale?.name);
    const transactionField = this.saleForm.get('transactionAmount');
    
    if (this.handoverMode) {
      transactionField?.setValue(this.priceSuggestion);
      this.getPersonForItem()
    } else {
      transactionField?.setValue(null);
      this.saleForm.get('person')?.setValue(null);
    }
  }

  onSubmitSale(): void {
    if (this.saleForm.valid) {
      const item: ItemForSale = mapSaleFormToItemForSale(
        this.saleForm.value,
        this.selectedPerson.personId,
        this.itemForSale?.id || 0
      );

      this.warehouse.updateItemSell(item).subscribe({
        next: (response: ItemForSale) => {
          console.log('Item added successfully', response);
          this.router.navigate(['/']);
        },
        error: (error: string) => {
          console.error('There was an error!', error);
        },
      });
    } else {
      console.log('Item Form is not valid');
      this.saleForm.markAllAsTouched();

      if (this.saleForm) {
        Object.keys(this.saleForm.controls).forEach((field) => {
          const control = this.saleForm.get(field);
          if (control?.hasError) {
            control.markAsDirty();
          }
        });
      }
    }
  }

  getPersonForItem() {
    debugger
    this.warehouse.getPersonForItem(this.itemForSale?.id || 0).subscribe({
      next: (personsForSearch: PersonForSearch) => {
        this.selectedPerson = personsForSearch;
        this.saleForm
          .get('person')
          ?.setValue(
            this.selectedPerson.name + ' ' + this.selectedPerson.surname
          );
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }

  openPersonsForSearch() {
    this.clientRegisterShortVisible = true;
  }

  onPersonSelect(person: PersonForSearch) {
    this.selectedPerson = person;
    this.clientRegisterShortVisible = false;
    this.saleForm
      .get('person')
      ?.setValue(this.selectedPerson.name + ' ' + this.selectedPerson.surname);
  }

  getError(field: string, form: FormGroup = this.saleForm): string {
    return this.errorMessageService.getError(field, form);
  }
}
