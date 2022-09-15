import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { SubCategory } from 'src/app/models/SubCategory';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data-subcategorylist',
  templateUrl: './data-subcategorylist.component.html',
  styleUrls: ['./data-subcategorylist.component.css']
})
export class DataSubcategorylistComponent implements OnInit {

  subCategories:SubCategory[];
  cat:Category[];
  ct:any;
  catname:string;
  constructor(public dataservice:DataService) { }

  ngOnInit(): void {
    this.subCategories=this.dataservice.getSubcategories();
    this.cat=this.dataservice.getCategorys();

  }

  deleteSubCategory(subCategory:SubCategory){
    this.dataservice.subCategoryDelete(subCategory);
  }
}
