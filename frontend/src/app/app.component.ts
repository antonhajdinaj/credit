import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

export interface MonthDetails {
  year: number;
  totalRemainingAmount: number;
  interests: number;
  interestRate: number;
  actuarialRate: number;
  capital: number;
  term: number;
  monthlyAmount: number;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'credit';

  formGroup: FormGroup;

  monthDetails: MonthDetails[];

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
        rate: this.formBuilder.control(''),
        years: this.formBuilder.control(''),
        amount: this.formBuilder.control(''),
      }
    );

  }

  ngOnInit(): void {
  }


  calculate() {
    this.monthDetails = [];
    const totalMonths = this.years * 12;
    let totalPaid = 0;
    for (let i = 0; i < totalMonths; i++) {
      const monthlyInterest = this.rate / 12 / 100;
      const term = (this.amount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, 0 - totalMonths));
      const interests = (this.amount - totalPaid) * monthlyInterest;
      const actuarialRate = Math.pow(1 + this.rate, 1 / 12) - 1;
      const capital = term - interests;
      totalPaid += capital;

      this.monthDetails.push(
        {
          interestRate: monthlyInterest,
          interests,
          capital,
          actuarialRate,
          term,
          totalRemainingAmount: this.amount - totalPaid,
          monthlyAmount: capital + interests,
          year: 0
        }
      );
    }
  }

  get rate() {
    return this.formGroup.get('rate').value;
  }

  get amount() {
    return this.formGroup.get('amount').value;
  }

  get years() {
    return this.formGroup.get('years').value;
  }
}
