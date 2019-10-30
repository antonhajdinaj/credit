import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

export interface CreditDetails {
  totalPaid: number;
  totalInterests: number;
}

export interface MonthDetails {
  year: number;
  totalRemainingAmount: number;
  interests: number;
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

  creditDetails: CreditDetails;
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
    let totalCapitalPaid = 0;
    for (let i = 0; i < totalMonths; i++) {
      const yearlyRate = this.rate / 100;
      const monthlyInterestRate = yearlyRate / 12;
      const term = (this.amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, 0 - totalMonths)); // échéance
      const interests = (this.amount - totalCapitalPaid) * monthlyInterestRate; // montant intérêts du mois
      const actuarialRate = Math.pow(1 + this.rate, 1 / 12) - 1; // taux actuariel
      const capital = term - interests; // capital remboursé pour ce mois
      totalCapitalPaid += capital;

      this.monthDetails.push(
        {
          interests,
          capital,
          actuarialRate,
          term,
          totalRemainingAmount: this.amount - totalCapitalPaid,
          monthlyAmount: capital + interests,
          year: 0
        }
      );
    }
    this.creditDetails = {
      totalInterests: this.monthDetails.map(m => m.interests).reduce((sum, current) => sum + current),
      totalPaid: this.monthDetails.map(m => m.term).reduce((sum, current) => sum + current)
    };
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
