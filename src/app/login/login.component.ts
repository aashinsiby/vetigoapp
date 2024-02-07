import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatIconModule,FormsModule,ReactiveFormsModule,RouterLink,RouterLinkActive, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{ 
  loginForm: FormGroup;
  errorMessage = '';
  hide = true;
  colorControl = new FormControl('primary' as ThemePalette);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
 
  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
  
    if (control === this.email && control.hasError('email')) {
      return 'Not a valid email';
    }
  
    if (control === this.password && control.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
  
    // Add custom error messages for other form controls if needed
  
    // Default return statement
    return '';
  }
  constructor(private afAuth: AngularFireAuth , private router : Router,private fb: FormBuilder){this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });}
  ngOnInit() { }
  async login() {
    if (this.loginForm.valid) {
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
        this.router.navigate(['/home']); // Redirect to home page after successful login
      } catch (error: any) { // Specify the type of 'error' as 'any'
        console.log(error);
        this.errorMessage = error.message; // Display error message to the user
      }
  }
}

}