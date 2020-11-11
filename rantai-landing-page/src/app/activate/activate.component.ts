import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailValidationService } from '../service/email-validation.service';
import {
  catchError
} from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  path_icon: string = ''
  status = "";
  description = ""

  constructor(
    private activatedRoute: ActivatedRoute,
    private emailService: EmailValidationService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(response => {
      this.emailService
      .validateUser(response.get('id'), response.get('token'))
      .pipe(
        catchError(err => {
          this.path_icon = "../../assets/images/failed.svg";
          this.status = "Activation Failed";
          this.description = "Authentication failed";
          return of() //kalau error biarin observeble nya kosong
        })
      )
      .subscribe(validate => {
        if(validate) { //ini bakal ngecek hasil observeble. kalau ada baru return success
          this.path_icon = "../../assets/images/success.svg";
          this.status = "Activation Success";
          this.description = "Thank You For Registering";
        }
      })
    })
  }

}
