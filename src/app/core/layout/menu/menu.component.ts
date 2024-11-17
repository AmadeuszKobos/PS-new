import { Component, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { PdfGeneratorComponent } from '../../../shared/components/pdf-generator/pdf-generator.component';

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [
    AvatarModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    PdfGeneratorComponent,
    RouterModule,
    MenuModule,
    OverlayPanelModule,
  ],
})
export class MenuComponent {
  items: MenuItem[] = [];

  menuWrapped: boolean = false;

  pdfGeneratorVisibility: boolean = false;

  wrapText: string = ''

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
        label: 'AdminPanel',
        icon: 'pi pi-cog',
        routerLink: '/settings',
      },
      {
        label: 'Wyloguj się',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
      {
        label: '',
        icon: 'pi pi-bars',
        command: () => this.toggleMenu(),
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

  showPdfGenerator() {
    this.pdfGeneratorVisibility = true;
  }

  logout() {
    this.authService.logout();
  }
}
