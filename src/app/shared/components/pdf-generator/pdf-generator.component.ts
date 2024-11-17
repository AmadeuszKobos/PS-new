import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ButtonModule } from 'primeng/button';
import { PawnContractTemplateComponent } from '../pawn-contract-template/pawn-contract-template.component';

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [ButtonModule, PawnContractTemplateComponent],
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.css'
})
export class PdfGeneratorComponent {
  date: string = new Date().toLocaleDateString();
  clientName: string = 'Jan Kowalski';
  clientContact: string = 'jan.kowalski@example.com, tel. 123-456-789';
  itemDescription: string = 'Złoty zegarek marki Omega';
  itemValue: number = 1500;

  @ViewChild('agreementContent') agreementContent!: ElementRef;

  generatePDF() {
    const data = this.agreementContent.nativeElement;

    html2canvas(data).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

      pdf.save('umowa_zastawu.pdf');
    });
  }
}
