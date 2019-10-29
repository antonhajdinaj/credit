import {Component, Input, OnInit} from '@angular/core';
import {MonthDetails} from '../app.component';

@Component({
  selector: 'app-amortization',
  templateUrl: './amortization.component.html',
  styleUrls: ['./amortization.component.scss']
})
export class AmortizationComponent implements OnInit {

  @Input()
  monthDetails: MonthDetails[];

  totalInterests: number;

  readonly displayedColumns: string[] = ['totalRemainingAmount', 'interests', 'capital', 'actuarialRate', 'term'];

  constructor() {
  }

  ngOnInit() {

    this.totalInterests = this.monthDetails.map(m => m.interests).reduce((sum, current) => sum + current);
    console.log(this.totalInterests);
    console.log(this.monthDetails.map(m => m.capital).reduce((sum, current) => sum + current));
  }

}
