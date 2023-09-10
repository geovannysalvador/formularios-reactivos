import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
import * as allValidators from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myFom:FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [ new EmailValidatorService()]],
    email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.validatorService.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required, Validators.minLength(6) ]],
  })

  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorsService,
    private emailValidator:EmailValidatorService,
    ){}

  isValidField(field:string){
    return this.validatorService.isValidField(this.myFom, field)
  }

  onSubmit(){
    this.myFom.markAllAsTouched;
  }

}
