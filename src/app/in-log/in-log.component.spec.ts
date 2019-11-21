import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InLogComponent } from './in-log.component';

describe('InLogComponent', () => {
  let component: InLogComponent;
  let fixture: ComponentFixture<InLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
