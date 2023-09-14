import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';

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
  ) {}

  showPassword() {
    this.isPassword = !this.isPassword;
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  // Check for individual validation errors
  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (
      !!control &&
      control.hasError(errorName) &&
      (control.dirty || control.touched || this.isSubmitted)
    );
  }

  // Check if any validation error occurs
  showInputError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (
      !!control &&
      control?.invalid &&
      (control.dirty || control.touched || this.isSubmitted)
    );
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
