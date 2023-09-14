import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../core/services/user.service';
import { ValidatorService } from '../../core/services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isPassword = true;
  isSubmitted = false;
  isInvalidLogin = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private validatorService: ValidatorService,
  ) {}

  showPassword() {
    this.isPassword = !this.isPassword;
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return this.validatorService.hasError(control, errorName, this.isSubmitted);
  }

  showInputError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return this.validatorService.showInputError(control, this.isSubmitted);
  }

  onLogin(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        complete: () => this.router.navigate(['/']),
        error: () => (this.isInvalidLogin = true),
      });
    }
  }
}
