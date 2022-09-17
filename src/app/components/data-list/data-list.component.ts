import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { Data } from '../../models/Data';
import { Category } from 'src/app/models/Category';

import { SubCategory } from 'src/app/models/SubCategory';
import { ExpenseList } from 'src/app/models/ExpenseList';


@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  datas: Data[];
  checkData:boolean=false;
  categories:Category[];
  subcategories1:SubCategory[];
  ctname:string;
  sctname:string;
  expense:ExpenseList;
  expenselist1:ExpenseList[];
 
  constructor(
    public dataService: DataService,
  ) { 
    this.expenselist1=[];
  }

  ngOnInit() {
    this.datas = this.dataService.getDatas();
    this.categories=this.dataService.getCategorys();
    this.subcategories1=this.dataService.getSubcategories();
    this.expenselist1= this.filteringFunction();
  }

  filteringFunction(){
    for(let data of this.datas){
      this.ctname=this.categories.filter(x=>x.categoryId==1)[0].categoryName
      console.log('subcat:'+this.subcategories1[0].subCategoryId)
      this.sctname=this.subcategories1.filter(x=>x.subCategoryId==1)[0].subCategoryName
      this.expense={
        price: data.price,date: data.date,
        type: data.type,category: data.category,
        categoryname:this.ctname,subcategory:data.subcategory,
        subcategoryname:this.sctname,description:data.description
      }
      this.expenselist1.push(this.expense)
      console.log('ans:'+this.expense)
    }
    return this.expenselist1
  }

  dataDelete(data: ExpenseList) {
    if (confirm('Are you sure? it will delete this record permanently !!')) {
      this.dataService.dataDelete(data);
    }
  }

}
