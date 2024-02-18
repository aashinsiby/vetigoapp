import { CommonModule } from '@angular/common';
import { Component,OnInit, Inject, Optional, Self, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Database, onValue, ref, set, update } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,MatSelectModule,MatInputModule,MatFormFieldModule, FormsModule, ReactiveFormsModule,MatIconModule,MatButtonModule,RouterLink, RouterLinkActive, RouterOutlet   ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{ 
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
     name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    pet: new FormControl('', [Validators.required])
  });

  
  constructor( private router: Router, public auth : Auth,public database: Database, private storage : AngularFireStorage) {}

  ngOnInit(): void {}
  
  register(formValues: any) {
    if (formValues.email === '') {
      alert('Please enter email');
      return;
    }
  
    if (formValues.password === '') {
      alert('Please enter password');
      return;
    }
  
    if (this.registerForm.get('email')?.hasError('email')) {
      alert('Not a valid email');
      return;
    }
  
    if (this.registerForm.get('password')?.hasError('minlength')) {
      alert('Password must be at least 8 characters long');
      return;
    }
  
    createUserWithEmailAndPassword(this.auth, formValues.email, formValues.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        set(ref(this.database,'users/'+user.uid),{
          email : formValues.email,
          name : formValues.name,
          username: formValues.username,
          pet : formValues.pet

        })
        alert('signup successful');
        this.router.navigate(['/login']);
        
        const starCountRef = ref(this.database,'users/'+user.uid)
          
        return onValue(starCountRef, (snapshot) => {
          const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        
        }, {
          onlyOnce: true
        });
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorCode);
      });
  } 
 
  
}