import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatIconModule,FormsModule,ReactiveFormsModule,RouterLink,RouterLinkActive, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 
  hide = true;
  colorControl = new FormControl('primary' as ThemePalette);
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required]);


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
}