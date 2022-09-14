import { Injectable } from '@angular/core';

import { Data } from '../models/Data';

import { Category } from '../models/Category';

import { SubCategory } from '../models/SubCategory';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  datas: Data[];

  categorys: Category[];

  subCategories: SubCategory[];

  cid: number;
  subid: number;

  constructor() {
    this.datas = [];

    this.subCategories = [];

    this.categorys = [];
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

  dataDelete(data: Data) {
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

  // categoryEdit(categoryData:Category){
  //   for (let i = 0; i < this.categorys.length; i++) {
  //     if (categoryData.categoryId == this.categorys[i].categoryId) {
  //       this.categorys[i].categoryName=categoryData.categoryName;
  //       this.categorys[i].categoryDescription=categoryData.categoryDescription;
  //       sessionStorage.setItem('categorys', JSON.stringify(this.categorys));
  //     }
  //   }
  // }

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

  // editSubCategory(subCategoryData:SubCategory){
  //   for (let i = 0; i < this.subCategories.length; i++) {
  //     if (subCategoryData.subCategoryId == this.subCategories[i].subCategoryId) {
  //       this.subCategories[i].subCategoryName=subCategoryData.subCategoryName
  //       this.subCategories[i].categoryIdOfSub=subCategoryData.categoryIdOfSub
  //       this.subCategories[i].subcategoryDescription=subCategoryData.subCategoryName
  //       sessionStorage.setItem('subCategories', JSON.stringify(this.subCategories));
  //     }
  //   }
  // }

  getCategorys() {
    if (sessionStorage.getItem('categorys') === null) {
      console.log(this.categorys);
      return this.categorys;
    } else {
      this.categorys = JSON.parse(sessionStorage.getItem('categorys'));
      return this.categorys;
    }
  }

  addCategory(category: Category) {
    console.log('add:' + category.categoryId);
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
      console.log(this.subCategories);
      return this.subCategories;
    }
  }
}
