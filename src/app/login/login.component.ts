import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isPassword = true;

  constructor(private formBuilder: FormBuilder) {}

  showPassword() {
    this.isPassword = !this.isPassword;
  }

  loginForm = this.formBuilder.group({
    email_address: '',
    password: '',
  });

  onLogin(): void {
    console.log(this.loginForm.value);
  }
}
