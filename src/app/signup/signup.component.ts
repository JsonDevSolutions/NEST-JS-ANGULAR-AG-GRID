import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}

  showPassword() {
    this.isPassword = !this.isPassword;
  }

  registerForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  } as User);

  onRegister(): void {
    this.userService.signUp(this.registerForm.value).subscribe();
  }
}
