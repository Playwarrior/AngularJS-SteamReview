import { Component, Input, OnInit } from '@angular/core'
import { UseCase } from '../../usecase.model'
import { Entiteit } from '../../Entiteit.model'

@Component({
  selector: 'app-usecase-details',
  templateUrl: './usecase-details.component.html',
  styleUrls: ['./usecase-details.component.scss']
})
export class UsecaseDetailsComponent implements OnInit {
  @Input() entiteit: Entiteit

  constructor() {}

  ngOnInit() {}
}
