import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { Data } from '../../models/Data';
import { Category } from 'src/app/models/Category';

import { SubCategory } from 'src/app/models/SubCategory';
import { ExpenseList } from 'src/app/models/ExpenseList';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css'],
})
export class DataListComponent implements OnInit {
  datas: Data[];
  checkData: boolean = false;
  categories: Category[];
  subcategories1: SubCategory[];
  ctname: string;
  sctname: string;
  expense: ExpenseList;
  expenselist1: ExpenseList[];

  constructor(public dataService: DataService) {
    this.expenselist1 = [];
  }

  ngOnInit() {
    this.datas = this.dataService.getDatas();
    this.dataService.getCategorys().subscribe((x)=>this.categories=x);
    this.dataService.getSubcategories().subscribe((x)=>this.subcategories1=x);;
    this.expenselist1 = this.filteringFunction();
  }

  filteringFunction() {
    let catname: any;
    let subname: any;
    for (let data of this.datas) {
      catname = this.categories.find((x) => {
        return x.id == data.category;
      });
      catname = (catname == undefined ? 'NA' : catname.categoryName);
      subname = this.subcategories1.find((x)=>{
        return x.id==data.subcategory
      });
      subname = (subname == undefined ? 'NA' : subname.subCategoryName);
      this.expense = {
        category: data.category,
        categoryname: catname,
        subcategory: data.subcategory,
        subcategoryname: subname,
      };
      this.expenselist1.push(this.expense);
      console.log('ans:' + this.expense);
    }
    return this.expenselist1;
  }

  dataDelete(data: ExpenseList) {
    if (confirm('Are you sure? it will delete this record permanently !!')) {
      this.dataService.dataDelete(data);
      this.dataService.getCategorys().subscribe((x)=>this.categories=x);
    }
  }
}
