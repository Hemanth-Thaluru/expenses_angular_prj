import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showExpenseForm = false; showCategoryForm = false; showSubCategoryForm = false;
  expenseBtn = 'Manage Expense'; categoryBtn = 'Manage Category'; subCategoryBtn = 'Manage SubCategory'

  title = 'Income and Expenses';
  onClickChange(value: any) {

    if (value === 'Expense') {
      this.showExpenseForm = !this.showExpenseForm
      if (this.expenseBtn === 'close Expense Form') {
        this.expenseBtn = 'Manage Expense'
      }
      else {
        this.expenseBtn = 'close Expense Form'
      }
    }

    if (value === 'Category') {
      this.showCategoryForm = !this.showCategoryForm
      if (this.categoryBtn === 'close Category Form') {
        this.categoryBtn = 'Manage Category'
      }
      else {
        this.categoryBtn = 'close Category Form'
      }
    }

    if (value === 'SubCategory') {
      this.showSubCategoryForm = !this.showSubCategoryForm
      if (this.subCategoryBtn === 'close SubCategory Form') {
        this.subCategoryBtn = 'Manage SubCategory'
      }
      else {
        this.subCategoryBtn = 'close SubCategory Form'
      }
    }
  }
}
