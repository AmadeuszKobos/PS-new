import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { Button } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AdminPanelService } from './services/admin-panel.service';
import { UserRegister } from './services/models/user.model';
import { CommonModule } from '@angular/common';
import { AddUserFormComponent } from './components/add-user-form/add-user-form.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    AddUserFormComponent,
    Button,
    CommonModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    PanelModule,
    TableModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  constructor(private adminPanelService: AdminPanelService) {}

  users: UserRegister[] = [];

  selectedRowUser!: UserRegister;

  addUserVisibility: boolean = false;

  first: number = 0;
  rows: number = 10;

  ngOnInit(): void {
    this.getUsersRegister();
  }

  showAddUserDialog() {
    this.addUserVisibility = true;
  }

  getUsersRegister() {
    this.adminPanelService.getUsersRegister().subscribe({
      next: (users: UserRegister[]) => {
        this.users = users;
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }

  changeUserBlockState() {
    this.adminPanelService
      .updateUserBlockState(
        this.selectedRowUser.userId,
        this.selectedRowUser.blocked
      )
      .subscribe({
        next: () => {
          console.log('Changing user block state');
        },
        error: (err: any) =>
          console.error('Observable emitted an error: ' + err),
        complete: () =>
          console.log('Observable emitted the complete notification'),
      });
  }
}
