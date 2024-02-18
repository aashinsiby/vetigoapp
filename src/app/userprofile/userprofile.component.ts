import { Component,OnInit    } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Database, child, get, getDatabase, onValue, set, update } from '@angular/fire/database';
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

  constructor(
    private afAuth: AngularFireAuth, // Adjust if using Cloud Firestore
    private afs: AngularFirestore, // Or AngularFirestore for Cloud Firestore
    private afStorage: AngularFireStorage
  ) {}

  async ngOnInit() {
    // Retrieve user data and pictures based on your database and authentication method
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = this.afAuth.firestore?.collection('users').doc(user.uid); // Adjust firestore path
        userRef?.valueChanges().subscribe(userData => {
          this.userName = userData?.name;
          this.userForm.setValue({ userName: this.userName }); // Pre-populate form with initial username
        });
      }
    });
  }
userForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
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



