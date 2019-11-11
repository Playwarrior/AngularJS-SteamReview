import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UsecaseDetailsComponent } from './usecase-details.component'

describe('UsecaseDetailsComponent', () => {
  let component: UsecaseDetailsComponent
  let fixture: ComponentFixture<UsecaseDetailsComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsecaseDetailsComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UsecaseDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
