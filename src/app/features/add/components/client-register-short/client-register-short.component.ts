import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TableModule } from 'primeng/table';
import { AddService } from '../../services/add.service';
import { FormsModule } from '@angular/forms';
import { PersonForSearch } from '../../models/Persons.model';

@Component({
  selector: 'app-client-register-short',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    TableModule,
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
  ],
  templateUrl: './client-register-short.component.html',
  styleUrl: './client-register-short.component.css',
})
export class ClientRegisterShortComponent {
  @Output() valueChanged = new EventEmitter<PersonForSearch>();

  personsForSearch: PersonForSearch[] = [];

  searchValue: string = '';

  selectedPerson?: PersonForSearch;

  first: number = 0;
  rows: number = 10;

  constructor(private addOrUpdateService: AddService) {}

  getPersonsForSearch() {
    this.addOrUpdateService.getPersonsForSearch(this.searchValue).subscribe({
      next: (personsForSearch: PersonForSearch[]) => {
        this.personsForSearch = personsForSearch;
        console.log(this.personsForSearch);
      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
  }

  selectPerson() {
    this.valueChanged.emit(this.selectedPerson);
  }
}
