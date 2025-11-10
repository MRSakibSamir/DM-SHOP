import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // loginData = {
  //   email: '',
  //   password: ''
  // };

  constructor(private router: Router) {}

  login(formData: any) {

    const demoEmail = "mrsakib788@gmail.com";
    const demoPassword = "123456";

    // if (formData.email === demoEmail && formData.password === demoPassword) {
      alert("Login Successful!");
      this.router.navigate(['/admin-dashboard']);
    // } else {
    //   alert("Invalid email or password. Please try again.");

  // onSubmit() {
  //   if (this.loginData.email && this.loginData.password) {
  //     console.log('Login submitted:', this.loginData);
  //     // Replace this with authentication service call
  //   } else {
  //     console.error('Invalid login data');
  //   }
  //  }

  }
}
