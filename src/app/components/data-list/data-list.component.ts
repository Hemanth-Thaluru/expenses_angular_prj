import { Component, OnInit } from '@angular/core';


import { DataService } from '../../services/data.service';
import { Data } from '../../models/Data';
import { Category } from 'src/app/models/Category';
import { AnyMxRecord } from 'dns';


@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {

  datas: Data[];
  checkData:boolean=false;
  categories:Category[];
  ctname;string;
  ct:any;

  constructor(
    public dataService: DataService,
  ) { }

  ngOnInit() {
    this.datas = this.dataService.getDatas();
    this.categories=this.dataService.getCategorys();
    this.newModel();
  }

  newModel(){
    let i=0
    for(let data of this.datas){
      this.ct[i]=this.ct[i].push(data)
      for(let category of this.categories)
      {
        if(data.category===String(category.categoryId))
        {this.ct[i].push(category.categoryName)}
      }
      i++;
    }
    console.log('ctname:'+this.ct);
  }

  dataDelete(data: Data) {
    if (confirm('Are you sure? it will delete this record permanently !!')) {
      this.dataService.dataDelete(data);
    }
  }

}
