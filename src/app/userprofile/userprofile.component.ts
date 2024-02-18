import { Component,OnInit    } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import {  Database, DatabaseReference, onValue } from '@angular/fire/database';
import { FileMetaData } from '../model/file-meta-data';
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from '@angular/fire/storage';
import { getAuth, onAuthStateChanged, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatDividerModule,MatInputModule,MatFormFieldModule,FormsModule,MatIconModule,CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent implements OnInit {
  userProfile: any = {}; // Initialize user profile object
  pictures: string[] = []; // Initialize array for pet pictures
  user?: firebase.User = null;
  userId?: string;
  userDetails: any = {};
  constructor(
    private afAuth: AngularFireAuth, // Adjust if using Cloud Firestore
    private afs: AngularFirestore, // Or AngularFirestore for Cloud Firestore
    private afStorage: AngularFireStorage
  ) {}

     ngOnInit() {
    this.afAuth.currentUser.subscribe(user => {
      if (user) {
        this.user = user;
        this.userId = user.uid;
        this.userDetails();
      } else {
        // Handle the case where no user is logged in
        console.log('No user is currently logged in.');
      }
    });
  }



  updateProfile() {// Replace with your Cloud Firestore document path
    this.afs.collection('users').doc(this.afAuth.currentUser.uid).update(this.userProfile)
      .then(() => console.log('Profile updated successfully!'))
      .catch(error => console.error('Error updating profile:', error));
  }


  // Image uploading functionality using Firebase Storage (adapt based on your needs):
  openImagePicker(type?: string) { // Handle separate upload types if needed
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Replace with your desired storage path and naming convention
        const filePath = type ? `profiles/${user.uid}/${type}/${file.name}` : `pets/${user.uid}/${file.name}`;
        const storageRef = this.afStorage.ref(filePath);
        const uploadTask = storageRef.put(file);

        uploadTask.snapshotChanges().subscribe(snapshot => {
          if (snapshot.bytesTransferred === snapshot.totalBytes) {
            storageRef.getDownloadURL().subscribe(url => {
              this.pictures.push(url); // Add downloaded URL to pictures array
            });
          }
        }, error => {
          console.error('Error uploading image:', error);
        });
      }
    };

    input.click();
  }

  openImagePreview(picture: string) {
    // Implement a modal or lightbox component to display the image in a larger view
  }

  removePicture(index: number) {
    // Implement picture removal logic (handle storage deletion and array update)
  }
}
//  uploadImage() {
//     if (!this.selectedFile) {
//       console.error('No file selected for upload!');
//       return;
//     }
//     else{
//       this.storage.upload("/files"+ Math.random()+this.selectedFile, this.selectedFile);
    
      
//      alert('Image uploaded successfully');
//      this.router.navigate(['/profile']);

//   }
 

// }



