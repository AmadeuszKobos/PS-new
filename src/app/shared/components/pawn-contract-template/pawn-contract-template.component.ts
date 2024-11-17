import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pawn-contract-template',
  standalone: true,
  imports: [],
  templateUrl: './pawn-contract-template.component.html',
  styleUrl: './pawn-contract-template.component.css'
})
export class PawnContractTemplateComponent {
  @Input() date!: string;
  @Input() clientName!: string;
  @Input() clientContact!: string;
  @Input() itemDescription!: string;
  @Input() itemValue!: number
}
