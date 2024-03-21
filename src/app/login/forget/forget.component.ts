import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [MatButton,FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css'
})
export class ForgetComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private afAuth: AngularFireAuth,private router: Router) {}

  forget() {
    if (this.emailFormControl.invalid) {
      alert('Please enter a valid email');
      return;
    }

    const email = this.emailFormControl.value;
    this.sendPasswordResetEmail(email);
  }

  sendPasswordResetEmail(email: string | null) {
    if (email !== null) {
      this.afAuth.sendPasswordResetEmail(email)
        .then(() => {
          alert('Password reset email sent. Please check your inbox.');
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          alert('Error sending password reset email: ' + error.message);
        });
    } else {
      alert('Email cannot be null');
    }
  }
  
  
}
