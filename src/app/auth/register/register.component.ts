import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // get passwordsDoNotMatch(): boolean {
  //   return (
  //     !!this.registerData.password &&
  //     !!this.registerData.confirmPassword &&
  //     this.registerData.password !== this.registerData.confirmPassword
  //   );
  // }

  constructor(private router: Router) {}

  register(formData: any) {
    console.log("User Registered:", formData);

    localStorage.setItem("user", JSON.stringify(formData));

    alert("Registration Successful!");
    this.router.navigate(['/login']);
  }

  // onSubmit() {
  //   if (!this.passwordsDoNotMatch) {
  //     console.log('Registration submitted:', this.registerData);
  //     // Replace with real registration API call
  //   } else {
  //     console.error('Passwords do not match');
  //   }
}

