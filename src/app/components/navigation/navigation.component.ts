import { Component, OnInit } from '@angular/core';


import { DataService } from '../../services/data.service';
import { Data } from '../../models/Data';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  datas: Data[];

  balance: Number;
  expense: Number;
  income: Number;


  constructor(
    public dataService: DataService,
  ) { }

  ngOnInit() {
    this.datas = this.dataService.getDatas();
    let expensesTotal = 0;
    let incomeTotal = 0;
    let e = 0;
    let I = 0;
    for (let i = 0; i < this.datas.length; i++) {
      if (this.datas[i].type == "Egreso") {
        e = parseFloat(this.datas[i].price);
        expensesTotal = (expensesTotal + e);
      } else {
        I = e = parseFloat(this.datas[i].price);
        incomeTotal = (incomeTotal + I)
      }
    }
    this.expense = expensesTotal;
    this.income = incomeTotal;
    this.balance = incomeTotal - expensesTotal;
  }
}

