import { Injectable } from '@angular/core';

import { Data } from '../models/Data';

import { Category } from '../models/Category';

import { SubCategory } from '../models/SubCategory';
import { SubCategoryList } from '../models/SubCategoryList';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  datas: Data[];

  categorys: Category[];

  subCategories: SubCategory[];
  subcategorylist: SubCategoryList;
  subcategorieslist: SubCategoryList[];
  str: string;
  cid: number;
  subid: number;
  readonly baseURLCategories = 'https://localhost:44391/api/Categories/';
  readonly baseURLSubCategories = 'https://localhost:44391/api/SubCategories/';
  constructor(private http: HttpClient) {
    this.datas = [];
    this.subCategories = [];
    this.categorys = [];
    this.subcategorieslist = [];
  }

  getDatas() {
    // if (sessionStorage.getItem('datas') === null) {
      this.http.get(this.baseURLCategories+'GetAllCategories').subscribe(
        (res) => {
          console.log(res); 
          console.log("before return in category")
          return res;
        },
        (error) => {
          console.log("Error msg:"+error);
        }
      );
      console.log("before return")
      return this.datas;
    // } else {
    //   this.datas = JSON.parse(sessionStorage.getItem('datas'));
    //   return this.datas;
    // }

    
  }

  addData(data: Data) {
    if (confirm('add details')) {
      this.datas.push(data);
      let datas: Data[] = [];
      if (sessionStorage.getItem('datas') === null) {
        datas.push(data);
        sessionStorage.setItem('datas', JSON.stringify(datas));
      } else {
        datas = JSON.parse(sessionStorage.getItem('datas'));

        for (let i = 0; i < datas.length; i++) {
          if (datas[i].description == data.description) {
            datas[i] = data;
            sessionStorage.setItem('datas', JSON.stringify(datas));
            return;
          }
        }

        datas.push(data);
        sessionStorage.setItem('datas', JSON.stringify(datas));
      }
    } else {
    }
  }

  dataDelete(data: any) {
    for (let i = 0; i < this.datas.length; i++) {
      if (data == this.datas[i]) {
        this.datas.splice(i, 1);
        sessionStorage.setItem('datas', JSON.stringify(this.datas));
        
      }
    }
  }

  categoryDelete(categoryData: Category) {
    // for (let i = 0; i < this.categorys.length; i++) {
    //   if (categoryData == this.categorys[i]) {
    //     this.categorys.splice(i, 1);
    //     sessionStorage.setItem('categorys', JSON.stringify(this.categorys));
    //   }
    // }
    this.http.delete(this.baseURLCategories+'DeleteCategory/'+[categoryData.id]).subscribe(x=>console.log("deleted sucessfully"));
    
  }

  subCategoryDelete(subCategoryData: SubCategory) {
    for (let i = 0; i < this.subCategories.length; i++) {
      if (subCategoryData == this.subCategories[i]) {
        this.subCategories.splice(i, 1);
        sessionStorage.setItem(
          'subCategories',
          JSON.stringify(this.subCategories)
        );
      }
    }
  }

  getCategorys() {
    return this.http.get<Category[]>(this.baseURLCategories+'GetAllCategories');
  }

 

  addCategory(category: Category) {
    this.categorys.push(category);
    // let categorys: Category[] = [];
    // if (sessionStorage.getItem('categorys') === null) {
    //   categorys.push(category);
    //   sessionStorage.setItem('categorys', JSON.stringify(categorys));
    // } else {
    //   categorys = JSON.parse(sessionStorage.getItem('categorys'));
    //   for (let i = 0; i < categorys.length; i++) {
    //     if (category.id == this.categorys[i].id) {
    //       categorys[i].name = category.name;
    //       categorys[i].description = category.description;
    //       sessionStorage.setItem('categorys', JSON.stringify(categorys));

    //       return;
    //     }
    //   }
    //   categorys.push(category);
     
    this.http.post(this.baseURLCategories+'Addcategory',{name:category.name,description:category.description}).subscribe(
        (res) => {
          console.log("Sucess-congrats")
        },
        (error) => {
          console.log("Error msg:"+error);
        }
      );
      // sessionStorage.setItem('categorys', JSON.stringify(categorys));
    }

    editCategory(category: Category) {
      console.log("catid:"+category.id)
      this.http.put(this.baseURLCategories+'UpdateCategoryById/'+[category.id],category).subscribe(
          (res) => {
            this.categorys[2]=category;
            console.log("Sucess-congrats")
          },
          (error) => {
            console.log("Error msg:"+error);
          }
        );
      }


  addSubCategory(subCategory: SubCategory) {
    this.subCategories.push(subCategory);
    let subCategories: SubCategory[] = [];
    if (sessionStorage.getItem('subCategories') === null) {
      subCategories.push(subCategory);
      sessionStorage.setItem('subCategories', JSON.stringify(subCategories));
    } else {
      subCategories = JSON.parse(sessionStorage.getItem('subCategories'));
      for (let i = 0; i < this.subCategories.length; i++) {
        if (subCategory.id == this.subCategories[i].id) {
          subCategories[i] = subCategory;
          sessionStorage.setItem(
            'subCategories',
            JSON.stringify(subCategories)
          );
          return;
        }
      }

      subCategories.push(subCategory);
      sessionStorage.setItem('subCategories', JSON.stringify(subCategories));
    }
  }

  editSubCategory(subCategory:SubCategory){
     this.http.put(this.baseURLSubCategories+'UpdateSubCategoryById/'+[subCategory.id],subCategory).subscribe();
  }

  getSubcategories() {
    return this.http.get<SubCategory[]>(this.baseURLSubCategories+'GetAllSubCategories');
  }

  catName() {
    let str1: any;
    let scl: SubCategoryList[] = [];
    for (let sub of this.subCategories) {
      str1 = this.categorys.find((x) => {
        return x.id == sub.categoryId;
      });
      str1 = str1 == undefined ? 'NA!' : str1.name;
      this.subcategorylist = {
        subCategoryId: sub.id,
        categoryName: str1,
        categoryIdOfSub: sub.categoryId,
        subCategoryName: sub.name,
        subcategoryDescription: sub.description,
      };
      scl.push(this.subcategorylist);
    }
    console.log('catname metod executed!');
    return scl;
  }
}
