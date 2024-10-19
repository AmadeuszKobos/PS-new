import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { WarehouseService } from '../../services/warehouse.service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { ItemRegister } from '../../models/item-register.model';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

import { conditionStates } from '../../../../shared/utils/conditionStates';
import { itemStatuses } from '../../../../shared/utils/itemStatuses';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AddItemFormComponent } from '../../../add/components/add-item-form/add-item-form.component';
import { SaleFormComponent } from '../../components/sale-form/sale-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { OperationTypeEnum } from '../../../../shared/Enums/operation-type-enum.model';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    AddItemFormComponent,
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
    DropdownModule,
    DialogModule,
    RouterModule,
    PanelModule,
    PaginatorModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    SaleFormComponent,
    InputIconModule,
  ],
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class WarehouseComponent implements OnInit {
  itemsRegister: ItemRegister[] = [];
  conditionStates: any = conditionStates;
  itemStatuses = itemStatuses;

  itemForAction?: ItemRegister;
  priceSuggestion?: number;

  first: number = 0;
  rows: number = 10;

  selectedRowItem!: ItemRegister;

  editFormVisibile: boolean = false;
  saleFormVisible: boolean = false;
  handOverFormVisible: boolean = false;
  extensionFormVisible: boolean = false;

  constructor(
    private warehouseService: WarehouseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getItemRegisterList();
  }

  showSaleOrHandoverDialog() {
    this.GetItemPriceSuggestion();
    this.saleFormVisible = true;
    this.itemForAction = this.selectedRowItem;
  }

  GetItemPriceSuggestion() {
    
    this.warehouseService
    .GetItemPriceSuggestion(
      this.selectedRowItem.id,
      this.selectedRowItem.pawnshopOwnershipDate
    )
    .subscribe({
      next: (priceSuggestion: number) => {
        this.priceSuggestion = priceSuggestion;
        debugger
      },
        error: (error) => {
          console.error('Error fetching item:', error);
        },
      });
  }

  showExtensionDialog() {
    this.extensionFormVisible = true;
  }

  showEditDialog() {
    this.editFormVisibile = true;
    this.itemForAction = this.selectedRowItem;
    //this.getItem();
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: `Czy na pewno chcesz usunąć "${this.selectedRowItem.name}"`,
      message: `Tej operacji nie możesz cofnąć`,
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.updateItemDelete();

        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  updateItemDelete() {
    this.warehouseService.updateItemDelete(this.selectedRowItem.id).subscribe({
      next: () => {
        console.log('Usuwanie w toku');
      },
      error: (err: any) => console.error('Napotkano błąd: ' + err),
      complete: () => console.log('Usunięto pomyślnie'),
    });
  }

  nagivateToItemHistory() {
    console.log(this.selectedRowItem);
    this.router.navigate(['/item-history'], {
      state: { id: this.selectedRowItem.id },
    });
  }

  getItemRegisterList() {
    this.warehouseService.getItems().subscribe({
      next: (itemRegisterList: ItemRegister[]) => {
        this.itemsRegister = itemRegisterList;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }
}
