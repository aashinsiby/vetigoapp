import { Component, Inject, OnInit, inject } from '@angular/core';
import {  Auth, User, user,authState  } from '@angular/fire/auth';
import { Database, onValue, ref, update } from '@angular/fire/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, tap } from 'rxjs/operators';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {  AngularFireAuthModule,  } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatCardModule, MatCardTitleGroup } from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFireAuthModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatCardModule,
    MatDividerModule,
  MatIconButton,
  MatCardTitleGroup,MatBadgeModule,MatChipsModule,MatListModule],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.css'
})
export class SwipeComponent {
  showForm: boolean = false;
  userId: string | null = null;
  profilePictureUrl: string | null = null;
  pictureUrl: string | null = null;
  pictureUrl1: string | null = null;
  pictureUrl2: string | null = null;
  pictureUrl3: string | null = null;


  bio: string | null = null;

   user: User | null = null;
  // user = user(this.auth);
  userSubscription = Subscription;
  authState = authState(this.auth);
  email: string | null = null;
  name: string | null = null;
  pet: string | null = null;
  downloadURL: any;
  imageUrls: string[] = [];
  username: string | null = null;
  sex: any;
  age: any;
  breed: any;
  constructor(

  private auth: Auth = inject(Auth),
  private database: Database,
  private storage: AngularFireStorage,
  private router: Router){}

  ngOnInit(): void {
    
    this.authState.subscribe((user: User | null) => {
     //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
     if (user) {
       this.userId = user.uid;
       this.fetchUserProfile();
     }

 })
   
 }


  fetchUserProfile() {
    const userRef = ref(this.database, 'users/' + this.userId);
    onValue(userRef,(snapshot) => {
      this.bio = snapshot.val()?.bio;
      this.email =snapshot.val()?.email;
      this.name = snapshot.val()?.name;
      this.pet = snapshot.val()?.pet;
      this.sex = snapshot.val()?.sex;
      this.age=snapshot.val()?.age;
      this.breed=snapshot.val()?.breed;
      this.profilePictureUrl = snapshot.val()?.profilePictureUrl;
      this.pictureUrl = snapshot.val()?.pictureUrl;
      this.pictureUrl1 = snapshot.val()?.pictureUrl1;
      this.pictureUrl2 = snapshot.val()?.pictureUrl2;
      this.pictureUrl3 = snapshot.val()?.pictureUrl3;
      this.username = snapshot.val()?.username;
    });
}
}
