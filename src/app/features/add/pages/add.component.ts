import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
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
    ClientFormComponent,
  ],
})
export class AddComponent {}
