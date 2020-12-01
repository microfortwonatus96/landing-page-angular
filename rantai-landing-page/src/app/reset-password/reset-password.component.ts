import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmailValidationService } from '../service/email-validation.service';
import { equalValidator } from '../validators/equalValidators';

export interface IchangePassword {
  id: string
  token: string
  password: string
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  formPassword: FormGroup = this.formBuilder.group({
    password: [null, [Validators.required, Validators.maxLength(25)]],
    confirmation_password: [null, [Validators.required, Validators.maxLength(25)]],
    id: [null, [Validators.required]],
    token: [null, [Validators.required]]
  }, { validators: equalValidator('password', 'confirmation_password') })

  failed: boolean = false
  success: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private emailService: EmailValidationService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(response => {
      if (response) {
        this.formPassword.patchValue({
          id: response.get('id'),
          token: response.get('token'),
          password: null,
          confirmation_password: null
        })
      }
    })
  }

  onSubmit() {
    this.failed = false
    this.success = false
    if (this.formPassword.valid) {
      let newPassword: IchangePassword = { ...this.formPassword.getRawValue() }
      this.emailService.updatePassword(newPassword.id, newPassword.password, newPassword.token).pipe(
        catchError(err => {
          this.failed = true
          return of()
        })
      ).subscribe(response => {
        this.formPassword.get('password').setValue(null)
        this.formPassword.get('confirmation_password').setValue(null)
        if (response) {
          this.success = true
        }
      })
    }
  }

}
