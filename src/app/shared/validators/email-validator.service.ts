import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {



  // primera forma
  // validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({email});

  //   return of({
  //     emailTaken: true
  //   })
  //   .pipe(
  //     delay(2000)
  //   );
  // }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const email = control.value;
    const httpCallObservable =  new Observable<ValidationErrors | null>((subscriber)=>{
      console.log({email});

      if (email === 'gote@google.com'){
        subscriber.next({emailTaken: true});
        subscriber.complete();
      }
      subscriber.next(null);
      subscriber.complete();

    })
    .pipe(
      delay(3000)
    )

    return httpCallObservable;
  }


}
