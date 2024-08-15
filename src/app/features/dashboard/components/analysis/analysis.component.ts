import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, ChartModule, FieldsetModule, CalendarModule, SelectButtonModule, ReactiveFormsModule],
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css', '..//../dashboard.component.css']
})
export class AnalysisComponent implements OnInit {
  analysisForm: FormGroup;

  data: any;

  options: any;

  constructor(private fb: FormBuilder){
    this.analysisForm = this.fb.group({
      dateFrom: [],
      dateTo: [],
      analysisOptions: []
    })
  }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Zastawy', 'Kupna', 'Sprzedaż'],
      datasets: [
        {
          data: [1, 1, 1],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }

  onSubmitAnalysis(): void {
    // if (this.clientForm.valid) {
    //   const client: Client = mapClientFormToClient(this.clientForm.value);

    //   this.addService.addClient(client).subscribe({
    //     next: (response: Client) => {
    //       console.log('Client added successfully', response);
    //       this.router.navigate(['/']);
    //     },
    //     error: (error: string) => {
    //       console.error('There was an error!', error);
    //     },
    //   });
    // } else {
    //   console.log('Client Form is not valid');
    //   this.clientForm.markAllAsTouched();
    // }
  }
}
