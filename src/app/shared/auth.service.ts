import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, GoogleAuthProvider, getAuth, } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'; 
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Database, getDatabase, set ,ref} from '@angular/fire/database';
import { Firestore, collection } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(
    
    private fireauth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    public database : Database // Only inject if using email verification
  ) {
   
  }



  get isAuthenticated(): boolean {
    return this.fireauth.currentUser !== null;
  }


  private handleError(error: any): void {
    console.error('Authentication error:', error);
    // Alert the user appropriately with a concise and informative message
    alert('Authentication failed: ' + error.message);
  }

  private handleUnverifiedEmail(user: any): void {
    // Custom logic to handle unverified email cases (e.g., redirect to verification page, send verification email)
    console.warn('User email is not verified:', user.email);
    alert('Your email is not verified. Please verify your email to proceed.');
    // Use a secure method to send verification email, avoiding direct links in logs
  }
}
