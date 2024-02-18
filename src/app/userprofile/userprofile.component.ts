import { Component, Inject, OnInit, inject } from '@angular/core';
import {  Auth, User, user,authState  } from '@angular/fire/auth';
import { Database, onValue, ref, update } from '@angular/fire/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, tap } from 'rxjs/operators';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {  AngularFireAuthModule,  } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [FormsModule,MatSelectModule,MatInputModule,MatFormFieldModule, ReactiveFormsModule,CommonModule,AngularFireAuthModule, ReactiveFormsModule,MatIconModule,MatButtonModule,RouterLink, RouterLinkActive, RouterOutlet,MatCardModule , MatDividerModule ],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
 
  userId: string | null = null;
  profilePictureUrl: string | null = null;
  pictureUrl: string | null = null;
  pictureUrl1: string | null = null;
  pictureUrl2: string | null = null;
  pictureUrl3: string | null = null;
  showForm: boolean = false;

  bio: string | null = null;
  form: FormGroup;
   user: User | null = null;
  // user = user(this.auth);
  userSubscription = Subscription;
  authState = authState(this.auth);
  email: string | null = null;
  name: string | null = null;
  pet: string | null = null;
  downloadURL: any;
  imageUrls: string[] = [];
  constructor(
    private auth: Auth = inject(Auth),
    private database: Database,
    private storage: AngularFireStorage,
   
  ) {this.form = new FormGroup({
    bio: new FormControl('')
  });}

  ngOnInit(): void {
    
     this.authState.subscribe((user: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      if (user) {
        this.userId = user.uid;
        this.fetchUserProfile();
      }
 
  })
    
  }
  toggleEdit() {
    this.showForm = !this.showForm;
  }
  fetchUserProfile() {
    const userRef = ref(this.database, 'users/' + this.userId);
    onValue(userRef,(snapshot) => {
      this.bio = snapshot.val()?.bio;
      this.email =snapshot.val()?.email;
      this.name = snapshot.val()?.name;
      this.pet = snapshot.val()?.pet;
      this.profilePictureUrl = snapshot.val()?.profilePictureUrl;
      this.pictureUrl = snapshot.val()?.pictureUrl;
      this.pictureUrl1 = snapshot.val()?.pictureUrl1;
      this.pictureUrl2 = snapshot.val()?.pictureUrl2;
      this.pictureUrl3 = snapshot.val()?.pictureUrl3;

    });

  
  }

  updateBio(newBio: string) {
    const userRef = ref(this.database, 'users/' + this.userId);
    update(userRef, { bio: newBio });
  }
  uploadImage(event: any): void {
    if (this.imageUrls.length < 4) { // Check if maximum reached
      const file = event.target.files[0];
      const filePath = 'images/' + file.name + this.userId;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
          
            this.imageUrls.push(url);
            const userRef = ref(this.database, 'users/' + this.userId);
            update(userRef, { pictureUrl: url });
          });
        })
      ).subscribe();
    } else {
      // Display a message or alert to inform the user about the limit
      console.log('Maximum of 4 images reached.');
    }
  }
  uploadImage1(event: any): void {
    if (this.imageUrls.length < 4) { // Check if maximum reached
      const file = event.target.files[0];
      const filePath = 'images/' + file.name + this.userId;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
           
            this.imageUrls.push(url);
            const userRef = ref(this.database, 'users/' + this.userId);
            update(userRef, { pictureUrl1: url });
          });
        })
      ).subscribe();
    } else {
      // Display a message or alert to inform the user about the limit
      console.log('Maximum of 4 images reached.');
    }
  }  
  uploadImage2(event: any): void {
    if (this.imageUrls.length < 4) { // Check if maximum reached
      const file = event.target.files[0];
      const filePath = 'images/' + file.name + this.userId;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
           
            this.imageUrls.push(url);
            const userRef = ref(this.database, 'users/' + this.userId);
            update(userRef, { pictureUrl2: url });
          });
        })
      ).subscribe();
    } else {
      // Display a message or alert to inform the user about the limit
      console.log('Maximum of 4 images reached.');
    }
  }  
  uploadImage3(event: any): void {
    if (this.imageUrls.length < 4) { // Check if maximum reached
      const file = event.target.files[0];
      const filePath = 'images/' + file.name + this.userId;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
           
            this.imageUrls.push(url);
            const userRef = ref(this.database, 'users/' + this.userId);
            update(userRef, { pictureUrl3: url });
          });
        })
      ).subscribe();
    } else {
      // Display a message or alert to inform the user about the limit
      console.log('Maximum of 4 images reached.');
    }
  }








  profilePic(event: any): void {
    const file = event.target.files[0];
    const filePath = 'profile-picture/' + file.name+ this.userId;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  
    // You can also get the download URL to display or save it in your database
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          
          const userRef = ref(this.database, 'users/' + this.userId);
          update(userRef, { profilePictureUrl: url });
        });
      })
    ).subscribe();
 
  }
  logout() {
    this.auth.signOut();
  }
}
