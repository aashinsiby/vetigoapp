import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Database, onValue, ref, update } from '@angular/fire/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet, } from '@angular/router';
import { MatCardModule, MatCardTitleGroup } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [
    FormsModule,
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
    MatCardTitleGroup,
    MatBadgeModule,
    MatChipsModule,
    MatListModule, DragDropModule
  ],
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
  likedUserId: any[] = [];
  swipedProfiles: any[] = [];
  allUserProfiles: {
    id: any;
    bio: any;
    name: any;
    pet: any;
    sex: any;
    age: any;
    breed: any;
    profilePictureUrl: any;
    pictureUrl: any;
    pictureUrl1: any;
    pictureUrl2: any;
    pictureUrl3: any;
    username: any;
  }[] = [];
  currentProfile: {
    id: any;
    bio: any;
    name: any;
    pet: any;
    sex: any;
    age: any;
    breed: any;
    profilePictureUrl: any;
    pictureUrl: any;
    pictureUrl1: any;
    pictureUrl2: any;
    pictureUrl3: any;
    username: any;
  } | null = null;
  bio: string | null = null;
  user: User | null = null;
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
  initialTouchX: number | null = null;
  initialTouchY: number | null = null;
  lastTouchTime: number | null = null;
  swipeDelayMs = 50; // Delay in milliseconds before registering a swipe
  cemail: string | null = null;



  constructor(private auth: Auth = inject(Auth), private database: Database, private firestore: Firestore) { }

  ngOnInit(): void {
    this.authState.subscribe((user: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      if (user) {
        this.userId = user.uid;
        const currentUserEmail = user.email ?? '';
        this.fetchUserProfile();
        this.fetchAllUserProfiles(currentUserEmail);
      }
    });
  }



  onSwipe(event: TouchEvent) {
    const currentTime = new Date().getTime();

    if (event.type === 'touchstart') {
      this.initialTouchX = event.touches[0].clientX;
      this.initialTouchY = event.touches[0].clientY;
      this.lastTouchTime = currentTime;
    } else if (event.type === 'touchmove') {
      const touch = event.touches[0];
      const deltaX = touch.clientX - (this.initialTouchX || 0);
      const deltaY = touch.clientY - (this.initialTouchY || 0);

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (currentTime - (this.lastTouchTime || 0) > this.swipeDelayMs) {
          if (deltaX < -100) {
            this.swipeLeft();
            this.addSwipeAnimation('swipe-left');
          } else if (deltaX > 100) {
            this.swipeRight();
            this.addSwipeAnimation('swipe-right');
          }
          this.lastTouchTime = currentTime;
        }
      }
    }
  }

  private addSwipeAnimation(animationClass: string) {
    // Add animation class to trigger CSS animation
    const cardElement = document.querySelector('.profile-card');
    if (cardElement) {
      cardElement.classList.add(animationClass);

      // Remove animation class after animation completes
      setTimeout(() => {
        cardElement.classList.remove(animationClass);
      }, 300); // Adjust the timeout according to your CSS animation duration
    }
  }


  swipeLeft() {
    if (!this.currentProfile) return;
    let foundNextProfile = false;
  
    for (let i = 0; i < this.allUserProfiles.length; i++) {
      if (this.allUserProfiles[i] === this.currentProfile) {
        if (i < this.allUserProfiles.length - 1) {
          this.currentProfile = this.allUserProfiles[i + 1];
        } else {
          alert("All swiped ");
        }
        foundNextProfile = true;
        break;
      }
    }
     if(!foundNextProfile) {console.log("all done");}
  }

  swipeRight() {
    if (!this.currentProfile) return; // Ensure currentProfile is not null or undefined
    const currentUserId = this.userId; // Assuming userId is the ID of the current user
    const likedUserId = this.currentProfile.id; // Assuming id is the ID of the liked user
    const likedRef = ref(this.database, `liked/${currentUserId}/${likedUserId}`);
    // Use update to set the liked profile ID as true
    update(likedRef, { liked: true })
      .then(() => {
        console.log('Liked profile saved to Realtime Database.');
      })
      .catch((error) => {
        console.error('Error saving liked profile to Realtime Database:', error);
      });
    this.swipeLeft();
  }
 



  fetchAllUserProfiles(currentUserEmail: string) {
    const usersRef = ref(this.database, 'users');

    // Use `once` to fetch data once for security:
    onValue(usersRef, (snapshot) => {
      const usersData: {
        id: any;
        bio: any;
        name: any;
        pet: any;
        sex: any;
        age: any;
        breed: any;
        profilePictureUrl: any;
        pictureUrl: any;
        pictureUrl1: any;
        pictureUrl2: any;
        pictureUrl3: any;
        username: any;

      }[] = [];
      snapshot.forEach((userSnapshot) => {
        const user = userSnapshot.val();

        if (user && user.email !== currentUserEmail) {
          // Exercise caution when handling sensitive data:
          const publicUserData = {
            id: userSnapshot.key,
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

      // Shuffle the array of profiles
      this.allUserProfiles = this.shuffleArray(usersData);
      // Display the first profile after shuffling
      this.currentProfile = this.allUserProfiles[0];
    });
  }

  // Function to shuffle an array
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  fetchUserProfile() {

    const userRef = ref(this.database, 'users/' + this.userId);

    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      this.bio = userData?.bio ?? null;
      this.name = userData?.name ?? null;
      this.pet = userData?.pet ?? null;
      this.sex = userData?.sex;
      this.age = userData?.age;
      this.breed = userData?.breed;
      this.profilePictureUrl = userData?.profilePictureUrl ?? null;
      this.pictureUrl = userData?.pictureUrl ?? null;
      this.pictureUrl1 = userData?.pictureUrl1 ?? null;
      this.pictureUrl2 = userData?.pictureUrl2 ?? null;
      this.pictureUrl3 = userData?.pictureUrl3 ?? null;
      this.username = userData?.username ?? null;
      this.cemail = userData?.cemail ?? null;
    });
  }



}
