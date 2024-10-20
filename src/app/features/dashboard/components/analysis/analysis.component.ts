import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { FieldsetModule } from 'primeng/fieldset';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DashboardService } from '../../services/dashboard.service';
import { Summary } from '../../models/summary.model';
import { OperationTypeEnum } from '../../../../shared/Enums/operation-type-enum.model';

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

  sales?: Summary;
  purchases?: Summary;
  pawns?: Summary;

  options: any;

  documentStyle = getComputedStyle(document.documentElement);


  constructor(private fb: FormBuilder, private dashboardService: DashboardService){
    this.analysisForm = this.fb.group({
      dateFrom: [new Date(), [Validators.required]],
      dateTo: [new Date(), [Validators.required]],
      analysisOptions: []
    })
  }

  ngOnInit(): void {
    const textColor = this.documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Pobierz', 'Nowe', 'Dane'],
      datasets: [
        {
          data: [1, 1, 1],
          backgroundColor: [
            this.documentStyle.getPropertyValue('--blue-500'),
            this.documentStyle.getPropertyValue('--yellow-500'),
            this.documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            this.documentStyle.getPropertyValue('--blue-400'),
            this.documentStyle.getPropertyValue('--yellow-400'),
            this.documentStyle.getPropertyValue('--green-400'),
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

  getAnalysis(): void {
    this.dashboardService.getSummariesByDateRange(new Date(this.analysisForm.value.dateFrom).toISOString(), new Date(this.analysisForm.value.dateTo).toISOString(), false).subscribe({
      next: (summaries: Summary[]) => {
        this.sales = summaries.find(x => x.operationId == OperationTypeEnum.Sale)
        this.purchases = summaries.find(x => x.operationId == OperationTypeEnum.Purchase)
        this.pawns = summaries.find(x => x.operationId == OperationTypeEnum.Pawn)
        
        debugger

        this.data = {
          labels: ['Zastawy', 'Kupna', 'Sprzedaż'],
          datasets: [
            {
              data: [this.pawns?.totalTransactionAmount, this.purchases?.totalTransactionAmount, this.sales?.totalTransactionAmount],
              backgroundColor: [
                this.documentStyle.getPropertyValue('--blue-500'),
                this.documentStyle.getPropertyValue('--yellow-500'),
                this.documentStyle.getPropertyValue('--green-500'),
              ],
              hoverBackgroundColor: [
                this.documentStyle.getPropertyValue('--blue-400'),
                this.documentStyle.getPropertyValue('--yellow-400'),
                this.documentStyle.getPropertyValue('--green-400'),
              ],
            },
          ],
        };

      },
      error: (err: any) => console.error('Observable emitted an error: ' + err),
      complete: () =>
        console.log('Sprzedaż: ' + this.sales + ' Zastawy: ' + this.pawns + ' zakup ' + this.purchases),
    })
  }
}
