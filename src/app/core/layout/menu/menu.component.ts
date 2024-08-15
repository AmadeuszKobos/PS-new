import { Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    AvatarModule,
    ButtonModule,
    OverlayPanelModule,
  ],
})
export class MenuComponent {
  items: MenuItem[] = [];

  menuWrapped: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.menuWrapped = localStorage.getItem('menuState') === 'wrapped' || false;

    this.items = [
      {
        label: 'Panel główny',
        icon: 'pi pi-home',
        routerLink: '/dashboard',
      },
      {
        label: 'Dodaj nowe',
        icon: 'pi pi-plus',
        routerLink: '/add',
      },
      {
        label: 'Magazyn',
        icon: 'pi pi-box',
        routerLink: '/warehouse',
      },
      {
        label: 'Kartoteka',
        icon: 'pi pi-file',
        routerLink: '/records',
      },
      {
        label: 'Ustawienia',
        icon: 'pi pi-cog',
        routerLink: '/settings',
      },
      {
        label: 'Wyloguj się',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  toggleMenu() {
    if (this.menuWrapped) {
      this.menuWrapped = false;
      localStorage.setItem('menuState', 'unwrapped');
    } else {
      this.menuWrapped = true;
      localStorage.setItem('menuState', 'wrapped');
    }
  }

  logout() {
    this.authService.logout();
  }
}
