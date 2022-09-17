import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { SubCategory } from 'src/app/models/SubCategory';
import { SubCategoryList } from 'src/app/models/SubCategoryList';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-data-subcategorylist',
  templateUrl: './data-subcategorylist.component.html',
  styleUrls: ['./data-subcategorylist.component.css']
})

export class DataSubcategorylistComponent implements OnInit {
  subCategories:SubCategory[];
  cat:Category[];
  catname:string;
  scl:SubCategoryList;
  subcategorylist1:SubCategoryList[];
  constructor(public dataservice:DataService) { 
    this.subcategorylist1=[]
  }

  ngOnInit(): void {
    this.subCategories=this.dataservice.getSubcategories();
    this.cat=this.dataservice.getCategorys();
    this.subcategorylist1=this.dataservice.catName();
    // this.catName()
  }

  catName(){
    console.log('catnamefunc')
     for(let sub of this.subCategories){
      this.catname=this.cat.find(x=>x.categoryId==sub.categoryIdOfSub).categoryName;
      console.log('catna'+this.catname)
      this.scl={
        subCategoryId:sub.subCategoryId,
        categoryName:this.catname,
        categoryIdOfSub:sub.categoryIdOfSub,
        subCategoryName:sub.subCategoryName,
        subcategoryDescription:sub.subcategoryDescription
      }
      this.subcategorylist1.push(this.scl);
    }
  }

  deleteSubCategory(subCategory:SubCategory){
    console.log('deletefn:'+subCategory)
    this.dataservice.subCategoryDelete(subCategory);
  }
}
