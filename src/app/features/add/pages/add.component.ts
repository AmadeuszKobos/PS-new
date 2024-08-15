import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { countries } from '../../../shared/utils/countries';
import { Client } from '../models/addClient.model';
import { mapClientFormToClient } from '../services/add-form-mappers';
import { AddService } from '../services/add.service';
import { AddItemFormComponent } from '../components/add-item-form/add-item-form.component';
import { ClientFormComponent } from '../components/client-form/client-form.component';



@Component({
  standalone: true,
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    TabViewModule,
    PanelModule,
    AddItemFormComponent,
    ClientFormComponent
  ],
})
export class AddComponent{

}
