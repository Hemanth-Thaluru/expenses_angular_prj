import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data-categorylist',
  templateUrl: './data-categorylist.component.html',
  styleUrls: ['./data-categorylist.component.css']
})
export class DataCategorylistComponent implements OnInit {

  categories:Category[];

  constructor(public dataservice:DataService) { 
    this.categories=[];
    this.dataservice.getCategorys().subscribe((x:Category[])=>this.categories=x);
  }

  ngOnInit(): void {
    this.dataservice.getCategorys().subscribe((x:Category[])=>this.categories=x);
  }
  deleteCategory(categoryData:Category){
    if (confirm('Are you sure? it will delete this record permanently !!')) {
      this.dataservice.categoryDelete(categoryData);
      window.location.reload()
    }
  }

}
