import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}

  showPassword() {
    this.isPassword = !this.isPassword;
  }

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  onLogin(): void {
    this.userService.login(this.loginForm.value).subscribe();
  }
}
