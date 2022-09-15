import { Component, OnInit } from '@angular/core';


import { DataService } from '../../services/data.service';
import { Data } from '../../models/Data';
import { Category } from 'src/app/models/Category';

import { SubCategory } from 'src/app/models/SubCategory';


@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  datas: Data[];
  checkData:boolean=false;
  categories:Category[];
  subcategories:SubCategory[];
  ctname:string;
 

  constructor(
    public dataService: DataService,
  ) { }

  ngOnInit() {
    this.datas = this.dataService.getDatas();
    this.categories=this.dataService.getCategorys();
    this.subcategories=this.dataService.getSubcategories();
    this.filteringFunction();
  }

  filteringFunction(){
    for(let data of this.datas){
      this.ctname=this.categories.filter(x=>x.categoryId==Number(data.category))[0].categoryName
      data.category=this.ctname;
      this.ctname=this.subcategories.filter(x=>x.subCategoryId=Number(data.subcategory))[0].subCategoryName
      data.subcategory=this.ctname;
    }
    
  }

  dataDelete(data: Data) {
    if (confirm('Are you sure? it will delete this record permanently !!')) {
      this.dataService.dataDelete(data);
    }
  }

}
