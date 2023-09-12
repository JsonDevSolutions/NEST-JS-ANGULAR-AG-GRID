import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isPassword = true;

  constructor(private formBuilder: FormBuilder) {}

  showPassword() {
    this.isPassword = !this.isPassword;
  }

  registerForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
  });
}
