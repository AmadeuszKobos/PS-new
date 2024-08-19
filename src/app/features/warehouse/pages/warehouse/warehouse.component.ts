import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { WarehouseService } from '../../services/warehouse.service';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { ItemRegister } from '../../models/item-register.model';
import { conditionStates } from '../../../../shared/utils/conditionStates';
import { itemStatuses } from '../../../../shared/utils/itemStatuses';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AddItemFormComponent } from '../../../add/components/add-item-form/add-item-form.component';
import { Item } from '../../../add/models/addItem';
import { SaleFormComponent } from '../../components/sale-form/sale-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PanelModule,
    PaginatorModule,
    TableModule,
    DropdownModule,
    TagModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    AddItemFormComponent,
    SaleFormComponent,
  ],
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class WarehouseComponent implements OnInit {
  itemsRegister: ItemRegister[] = [];
  conditionStates: any = conditionStates;
  itemStatuses = itemStatuses;

  itemForAction?: Item;

  first: number = 0;
  rows: number = 10;

  selectedRowItem!: ItemRegister;

  editFormVisibile: boolean = false;
  saleFormVisible: boolean = false;

  constructor(
    private warehouseService: WarehouseService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getItemRegisterList();
  }

  showSaleDialog() {
    this.saleFormVisible = true;

    this.getItem();
  }

  showEditDialog() {
    this.editFormVisibile = true;

    this.getItem();
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      header: `Czy na pewno chcesz usunąć "${this.selectedRowItem.name}"`,
      message: `Tej operacji nie możesz cofnąć`,
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
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

  nagivateToItemHistory()
  {
    this.router.navigate(['/item-history'])
  }

  getItem() {
    this.warehouseService.getItem(this.selectedRowItem.id).subscribe({
      next: (itemForEdit: Item) => {
        this.itemForAction = itemForEdit;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () => console.log(this.itemForAction),
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
