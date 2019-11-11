import { TestBed, async } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { UsecasesComponent } from '../../about/usecases/usecases.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { UsecaseComponent } from 'src/app/about/usecases/usecase/usecase.component'
import { DashboardComponent } from '../dashboard/dashboard.component'
import { NavbarComponent } from '../navbar/navbar.component'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NgbModule],
      declarations: [AppComponent, DashboardComponent, NavbarComponent, UsecasesComponent, UsecaseComponent]
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })

  it(`should have as title 'My App'`, () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('My App')
  })
})
