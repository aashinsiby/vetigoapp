import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ThemePalette} from '@angular/material/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,MatSelectModule,MatInputModule,MatFormFieldModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,RouterLink, RouterLinkActive, RouterOutlet ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent { 
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