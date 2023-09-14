import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root', // You can provide it at a different module level if needed
})
export class ValidatorService {
  constructor() {}

  // Check for individual validation error
  hasError(
    control: AbstractControl | null,
    errorName: string,
    isSubmitted: boolean,
  ): boolean {
    return (
      !!control &&
      control.hasError(errorName) &&
      (control.dirty || control.touched || isSubmitted)
    );
  }

  // Check if any validation error occurs
  showInputError(
    control: AbstractControl | null,
    isSubmitted: boolean,
  ): boolean {
    return (
      !!control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
