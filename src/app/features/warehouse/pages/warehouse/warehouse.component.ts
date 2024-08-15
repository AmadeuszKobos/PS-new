import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    PanelModule,
    PaginatorModule,
    TableModule,
    CommonModule,
    DropdownModule,
    TagModule,
    ButtonModule,
    DialogModule,
    AddItemFormComponent,
  ],
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WarehouseComponent implements OnInit {
  itemsRegister: ItemRegister[] = [];
  conditionStates: any = conditionStates;
  itemStatuses = itemStatuses;

  itemForEdit?: Item;

  first: number = 0;
  rows: number = 10;

  selectedRowItem!: ItemRegister;

  visible: boolean = false;

  constructor(private warehouseService: WarehouseService) {}

  ngOnInit(): void {
    this.getItemRegisterList();
  }

  showDialog() {
    this.visible = true;

    this.getItem();
  }

  getItem() {
    this.warehouseService.getItem(this.selectedRowItem.id).subscribe({
      next: (itemForEdit: Item) => {
        this.itemForEdit = itemForEdit;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () => console.log(this.itemForEdit),
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
