import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import * as allValidators from 'src/app/shared/validators/validators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myFom:FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.pattern(allValidators.firstNameAndLastnamePattern) ]],
    email: ['', [ Validators.required, Validators.pattern(allValidators.emailPattern) ]],
    username: ['', [ Validators.required, allValidators.cantBeStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required, Validators.minLength(6) ]],
  })

  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorsService,
    ){}

  isValidField(field:string):void{
    //TODO validacion de un servicio
  }

  onSubmit(){
    this.myFom.markAllAsTouched;
  }

}
