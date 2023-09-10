import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public myFormD:FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Metal Slug', Validators.required]
    ])
  });

  public newFavorite:FormControl = new FormControl('', Validators.required)

  constructor(
    private fb:FormBuilder,
    private validatorService:ValidatorsService,
    ) {}

  get favoriteGames(){
    return this.myFormD.get('favoriteGames') as FormArray
  }

  isValidField(field:string){
    return this.validatorService.isValidField(this.myFormD, field)
  }

  isValidFieldInArray(formArray:FormArray, index:number){
    return formArray.controls[index].errors && formArray.controls[index].touched;

  }

  getFieldError(field: string): string | null {
    if (!this.myFormD.controls[field]) return null;

    const errors = this.myFormD.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es necesario';
        case 'minlength':
          return `Mino ${ errors ['minlength'].requiredLength } de caracteres`;
      }
    }
    return '';
  }

  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index);
  }

  onAddFavorites():void{
    if(this.newFavorite.invalid) return;

    const newFavoriteGame = this.newFavorite.value;

    // sin form B
    // this.favoriteGames.push(new FormControl(newFavoriteGame, Validators.required))

    // con el fomr builder
    this.favoriteGames.push(
      this.fb.control(newFavoriteGame, Validators.required)
    );
    this.newFavorite.reset();

  }


  onSunmit():void{

    if(this.myFormD.invalid){
      this.myFormD.markAllAsTouched();
      return;
    }

    console.log(this.myFormD.value);
    (this.myFormD.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myFormD.reset();
  }


}
