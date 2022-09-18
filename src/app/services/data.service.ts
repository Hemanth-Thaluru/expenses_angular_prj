import { Injectable } from '@angular/core';

import { Data } from '../models/Data';

import { Category } from '../models/Category';

import { SubCategory } from '../models/SubCategory';
import { SubCategoryList } from '../models/SubCategoryList';

import { HttpClient } from '@angular/common/http';

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
  readonly baseURL = 'https://localhost:44352/api/Categories';
  constructor(private http: HttpClient) {
    this.datas = [];

    this.subCategories = [];

    this.categorys = [];
    this.subcategorieslist = [];
  }

  getDatas() {
    if (sessionStorage.getItem('datas') === null) {
      return this.datas;
    } else {
      this.datas = JSON.parse(sessionStorage.getItem('datas'));
      return this.datas;
    }
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
    for (let i = 0; i < this.categorys.length; i++) {
      if (categoryData == this.categorys[i]) {
        this.categorys.splice(i, 1);
        sessionStorage.setItem('categorys', JSON.stringify(this.categorys));
      }
    }
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
    if (sessionStorage.getItem('categorys') === null) {
      return this.categorys;
    } else {
      this.categorys = JSON.parse(sessionStorage.getItem('categorys'));
      return this.categorys;
    }
  }

  addCategory(category: Category) {
    this.categorys.push(category);
    let categorys: Category[] = [];
    if (sessionStorage.getItem('categorys') === null) {
      categorys.push(category);
      sessionStorage.setItem('categorys', JSON.stringify(categorys));
    } else {
      categorys = JSON.parse(sessionStorage.getItem('categorys'));
      for (let i = 0; i < categorys.length; i++) {
        if (category.categoryId == this.categorys[i].categoryId) {
          categorys[i].categoryName = category.categoryName;
          categorys[i].categoryDescription = category.categoryDescription;
          sessionStorage.setItem('categorys', JSON.stringify(categorys));

          return;
        }
      }
      categorys.push(category);
      let ct:any
      ct={
        ID:4,
        Name:category.categoryName,
        Description:category.categoryDescription
      }
      console.log('noodles')
      this.http.post(this.baseURL, ct).subscribe(
        (res) => {
          console.log("Sucess-congrats")
        },
        (error) => {
          console.log("Error msg:"+error);
        }
      );
      sessionStorage.setItem('categorys', JSON.stringify(categorys));
    }
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
        if (subCategory.subCategoryId == this.subCategories[i].subCategoryId) {
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

  getSubcategories() {
    if (sessionStorage.getItem('subCategories') === null) {
      return this.subCategories;
    } else {
      this.subCategories = JSON.parse(sessionStorage.getItem('subCategories'));
      return this.subCategories;
    }
  }

  catName() {
    let str1: any;
    let scl: SubCategoryList[] = [];
    for (let sub of this.subCategories) {
      str1 = this.categorys.find((x) => {
        return x.categoryId == sub.categoryIdOfSub;
      });
      str1 = str1 == undefined ? 'NA!' : str1.categoryName;
      this.subcategorylist = {
        subCategoryId: sub.subCategoryId,
        categoryName: str1,
        categoryIdOfSub: sub.categoryIdOfSub,
        subCategoryName: sub.subCategoryName,
        subcategoryDescription: sub.subcategoryDescription,
      };
      scl.push(this.subcategorylist);
    }
    console.log('catname metod executed!');
    return scl;
  }
}
