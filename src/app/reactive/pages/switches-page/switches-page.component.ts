import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [ true, [Validators.required]],
    termsAndConditions: [false, [Validators.requiredTrue]]
  })

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorsService,
    ) {}

  ngOnInit(): void {
    this.myForm.reset(this.person)
  }

  isValidField(field:string){
    return this.validatorService.isValidField(this.myForm, field)
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    // Para eliminar un termino si se estan mandando mas informacion de la necesaria
    const {termsAndConditions, ...newPerson} = this.myForm.value;


    console.log(this.myForm.value);

    this.person = newPerson;
    console.log(newPerson);


  }

}
