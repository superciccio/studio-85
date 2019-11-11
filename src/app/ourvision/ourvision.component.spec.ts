import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OurvisionComponent} from './ourvision.component';

describe('OurvisionComponent', () => {
  let component: OurvisionComponent;
  let fixture: ComponentFixture<OurvisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OurvisionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurvisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
