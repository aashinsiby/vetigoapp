import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder for building forms
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

 
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userProfile: any = {}; // Initialize user profile object
  userName: string = ''; // Define userName property and its type
 
  userForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
 
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private formBuilder: FormBuilder // Add formBuilder for form initialization
  ) {}
 
  ngOnInit(): void {
    const auth = this.afAuth.auth;
    
    this.afAuth.authState.subscribe((user: any | null) => { // Use authState for current user
      if (user) {
        const userRef = this.afs.collection('users').doc(user.uid);
        userRef.valueChanges().subscribe((userData: any) => {
          this.userName = userData?.name;
          this.userForm.patchValue({ userName: this.userName });
        });
      }
    });
  }
 
  updateProfile() {
    this.afs.collection('users').doc(this.afAuth.currentUser?.uid).update(this.userProfile)
      .then(() => console.log('Profile updated successfully!'))
      .catch(error => console.error('Error updating profile:', error));
  }
 
  openImagePicker(type?: string) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
 
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]; // Correct type casting
      if (file) {
        const filePath = type ? `profiles/${this.afAuth.currentUser?.uid}/${type}/${file.name}` : `pets/${this.afAuth.currentUser?.uid}/${file.name}`;
        const storageRef = this.afStorage.ref(filePath);
        const uploadTask = storageRef.put(file);
 
        uploadTask.snapshotChanges().subscribe(snapshot => {
          if (snapshot.bytesTransferred === snapshot.totalBytes) {
            storageRef.getDownloadURL().subscribe(url => {
              this.pictures.push(url);
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