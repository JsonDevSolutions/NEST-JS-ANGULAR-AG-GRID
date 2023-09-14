import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/interfaces/user.interface';
import { ValidatorService } from '../../core/services/validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isPassword = true;
  isSubmitted = false;
  isDisplaySuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private validatorService: ValidatorService,
  ) {}

  showPassword() {
    this.isPassword = !this.isPassword;
  }

  registerForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  hasError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return this.validatorService.hasError(control, errorName, this.isSubmitted);
  }

  showInputError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return this.validatorService.showInputError(control, this.isSubmitted);
  }

  onRegister(): void {
    this.isSubmitted = true;
    this.isDisplaySuccess = false;
    if (this.registerForm.valid) {
      this.userService
        .signUp(this.registerForm.value)
        .subscribe({ complete: () => (this.isDisplaySuccess = true) });
      this.registerForm.reset();
      this.isSubmitted = false;
    }
  }
}
