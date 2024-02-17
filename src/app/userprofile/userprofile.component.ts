import { Component,OnInit  } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFireAuth  } from '@angular/fire/compat/auth';
import { catchError, finalize, tap } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Database, child, get, getDatabase, onValue, set } from '@angular/fire/database';
import { FileMetaData } from '../model/file-meta-data';
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from '@angular/fire/storage';
import { onAuthStateChanged, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatDividerModule,MatInputModule,MatFormFieldModule,FormsModule,MatIconModule,CommonModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent  implements OnInit {
 
  name: string | null = null;


  proimage: string = '../../assets/user.png'; 
  constructor(private storage: AngularFireStorage, private auth: AngularFireAuth,private database: Database, private router : Router) {}

  ngOnInit() {

  }
 
  selectedFile: File | null = null;
  imageURL: string | null = null;
  

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

 uploadImage() {
    if (!this.selectedFile) {
      console.error('No file selected for upload!');
      return;
    }
    else{
      this.storage.upload("/files"+ Math.random()+this.selectedFile, this.selectedFile);
    
      
     alert('Image uploaded successfully');
     this.router.navigate(['/profile']);

  }
 

}

}

