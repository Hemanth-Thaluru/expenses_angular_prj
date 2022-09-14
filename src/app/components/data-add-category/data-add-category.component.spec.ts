import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAddCategoryComponent } from './data-add-category.component';

describe('DataAddCategoryComponent', () => {
  let component: DataAddCategoryComponent;
  let fixture: ComponentFixture<DataAddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAddCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
