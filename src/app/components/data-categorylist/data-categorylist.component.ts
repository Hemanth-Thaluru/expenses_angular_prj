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
    console.log('cat ctr');
  }

  ngOnInit(): void {
    this.categories=this.dataservice.getCategorys();
    console.log('ng cat')
  }
  deleteCategory(categoryData:Category){
    if (confirm('Are you sure? it will delete this record permanently !!')) {
      this.dataservice.categoryDelete(categoryData);
      console.log('deletemethod')
    }
  }
}
