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
    this.subcategorylist1=[];
    this.dataservice.getSubcategories().subscribe((x)=>this.subCategories=x);
  }

  ngOnInit(): void {
    this.dataservice.getSubcategories().subscribe((x)=>this.subCategories=x);
    this.dataservice.getCategorys().subscribe((x:Category[])=>this.cat=x);
    this.subcategorylist1=this.catName();
  }


  deleteSubCategory(subCategory:SubCategory){

    this.dataservice.subCategoryDelete(subCategory);
  }

  catName() {
    let str1: any;
    let scl1: SubCategoryList[] = [];
    let scl:SubCategoryList;
    // for (let sub of this.subCategories) {
    //   // str1 = this.cat.find((x) => {
    //   //   return x.id == sub.categoryId;
    //   // });
    //   // str1 = str1 == undefined ? 'NA!' : str1.name;
    //   // this.scl = {
    //   //   subCategoryId: sub.id,
    //   //   categoryName: str1,
    //   //   categoryIdOfSub: sub.categoryId,
    //   //   subCategoryName: sub.name,
    //   //   subcategoryDescription: sub.description,
    //   // };
    //   // scl1.push(this.scl);
    // }
    console.log('catname metod executed!');
    return scl1;
  }


}
