import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailFurnitureComponent} from './detail-furniture.component';

describe('DetailFurnitureComponent', () => {
  let component: DetailFurnitureComponent;
  let fixture: ComponentFixture<DetailFurnitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFurnitureComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
