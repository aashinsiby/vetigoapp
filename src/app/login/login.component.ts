import { Component, OnInit, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Database, child, get, ref, update } from '@angular/fire/database';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatInputModule,MatFormFieldModule,MatIconModule,FormsModule,ReactiveFormsModule,RouterLink,RouterLinkActive, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  { 
 
  hide = true;
   loginForm : FormGroup =  new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor( private router: Router,private auth: Auth, private database: Database,private fireauth: AngularFireAuth) {}
  ngOnInit(): void {
   
   }
   private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Initial state
isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  signIn(formValues: any) {
    if (formValues.email === '') {
      alert('Please enter email');
      return;
    }
  
    if (formValues.password === '') {
      alert('Please enter password');
      return;
    }
  
    if (this.loginForm.get('email')?.hasError('email')) {
      alert('Not a valid email');
      return;
    }
  
    if (this.loginForm.get('password')?.hasError('minlength')) {
      alert('Password must be at least 8 characters long');
      return;
    }
    signInWithEmailAndPassword(this.auth, formValues.email, formValues.password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;

      const idToken = userCredential.user?.getIdToken();
      if (idToken) {
        // Store the token securely, e.g., in local storage or browser session
        localStorage.setItem('firebaseToken', await idToken);
       
        // Navigate to the protected route or profile page
        this.router.navigate(['/profile']);
      }
   
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    
        });
  }
  get isAuthenticated(): boolean {
    return this.fireauth.currentUser !== null;
  }
  updateIsAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }

}