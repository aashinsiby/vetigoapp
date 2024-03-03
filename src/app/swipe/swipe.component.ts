import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  Auth, User, authState  } from '@angular/fire/auth';
import { Database, onValue, ref } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  styleUrl: './swipe.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwipeComponent {
  showForm: boolean = false;
  userId: string | null = null;
  profilePictureUrl: string | null = null;
  pictureUrl: string | null = null;
  pictureUrl1: string | null = null;
  pictureUrl2: string | null = null;
  pictureUrl3: string | null = null;

  allUserProfiles: any[] = [];
  bio: string | null = null;
  currentIndex: number = 0; 
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
       this.fetchAllUserProfiles();
     }

 })
   
 }

 
 fetchAllUserProfiles() {
  const usersRef = ref(this.database, 'users');

  // Use `once` to fetch data once for security:
  onValue(usersRef, (snapshot) => {
    const usersData: { bio: any; name: any; pet: any; sex: any; age: any; breed: any; profilePictureUrl: any; pictureUrl: any; pictureUrl1: any; pictureUrl2: any; pictureUrl3: any; username: any; }[] = [];
    snapshot.forEach((userSnapshot) => {
      const user = userSnapshot.val();
      if (user) {
        // Exercise caution when handling sensitive data:
        const publicUserData = {
          bio: user.bio,
          name: user.name,
          pet: user.pet,
          sex: user.sex,
          age: user.age,
          breed: user.breed,
          profilePictureUrl: user.profilePictureUrl,
          pictureUrl: user.pictureUrl,
          pictureUrl1: user.pictureUrl1,
          pictureUrl2: user.pictureUrl2,
          pictureUrl3: user.pictureUrl3,
          username: user.username,
        };
        usersData.push(publicUserData);
      }
    });

    this.allUserProfiles = usersData;
    
  });
}

  fetchUserProfile() {
    
    const userRef = ref(this.database, 'users/' + this.userId);
    onValue(userRef,(snapshot) => {
      this.bio = snapshot.val()?.bio;
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
  // Handle swipe left action
 

  // Handle swipe right action
 
  
}
