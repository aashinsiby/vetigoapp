import { Component, inject, CUSTOM_ELEMENTS_SCHEMA ,HostListener, ViewChild } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Database, get, onValue, ref, set, update } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
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
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatCardModule, MatCardTitleGroup } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import Swiper from 'swiper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragEnd } from '@angular/cdk/drag-drop';


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
  likedUserId : any[] = [];
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
  
startX :number =0;
endX :number =0;
  cemail: string | null = null;swiper: any;




  constructor(
    private auth: Auth = inject(Auth),
    private database: Database,
    private storage: AngularFireStorage,
  ) { 
    const swiper = new Swiper('.swiper', {
      on: {
        activeIndexChange: function(swiper) {
          // Handle active index change here
        }
      },
    });
   
  }

  ngOnInit(): void {
    this.authState.subscribe((user: User | null) => {
      //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
      if (user) {
        this.userId = user.uid;
        const currentUserEmail = user.email ?? ''; // Use empty string if user.email is null
        this. fetchUserProfile() ;
        this.fetchAllUserProfiles(currentUserEmail);
      }
    });
  } 

  profiles = [
    {
      name: 'John Doe',
      age: 25,
      bio: 'Hello, I am a software engineer and enjoy hiking on weekends.',
      imageUrl: 'https://via.placeholder.com/300x400'
    },
    {
      name: 'Jane Smith',
      age: 28,
      bio: 'I love traveling and experiencing new cultures.',
      imageUrl: 'https://via.placeholder.com/300x400'
    }, {
      name: 'ohn Doe',
      age: 25,
      bio: 'Hello, I am a software engineer and enjoy hiking on weekends.',
      imageUrl: 'https://via.placeholder.com/300x400'
    },
    {
      name: 'Jan Smith',
      age: 28,
      bio: 'I love traveling and experiencing new cultures.',
      imageUrl: 'https://via.placeholder.com/300x400'
    }, {
      name: 'Joh Doe',
      age: 25,
      bio: 'Hello, I am a software engineer and enjoy hiking on weekends.',
      imageUrl: 'https://via.placeholder.com/300x400'
    },
    {
      name: 'Jne Smith',
      age: 28,
      bio: 'I love traveling and experiencing new cultures.',
      imageUrl: 'https://via.placeholder.com/300x400'
    }, {
      name: 'Jhn Doe',
      age: 25,
      bio: 'Hello, I am a software engineer and enjoy hiking on weekends.',
      imageUrl: 'https://via.placeholder.com/300x400'
    },
    {
      name: 'Jae Smith',
      age: 28,
      bio: 'I love traveling and experiencing new cultures.',
      imageUrl: 'https://via.placeholder.com/300x400'
    },
    // Add more profiles as needed
  ];

  currentProfileIndex = 0;
  initialTouchX: number | null = null;
  initialTouchY: number | null = null;
  lastTouchTime: number | null = null;
  swipeDelayMs = 50; // Delay in milliseconds before registering a swipe

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
          } else if (deltaX > 100) {
            this.swipeRight();
          }
          this.lastTouchTime = currentTime;
        }
      }
    }
  }


  swipeLeft() {
    // Handle swipe left logic
    this.nextProfile();
  }

  swipeRight() {
    // Handle swipe right logic
    this.nextProfile();
  }

  nextProfile() {
    this.currentProfileIndex = (this.currentProfileIndex + 1) % this.profiles.length;
  }




  fetchAllUserProfiles(currentUserEmail: string) {
    const usersRef = ref(this.database, 'users');

    // Use `once` to fetch data once for security:
    onValue(usersRef, (snapshot) => {
      const usersData: {
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
        this.cemail = snapshot.val()?.cemail;
      });
  }


 onSwiperInit(swiper: any) {
  const swiperEl = document.querySelector('swiper-container');

  this.swiper.addEventListener('swiperprogress', (event: { detail: [any, any]; }) => {
    const [swiper, progress] = event.detail;
  });

  this.swiper.addEventListener('swiperslidechange', () => {
    console.log('slide changed');
  });
  }
   

  onSlideChange() {
    const activeIndex = this.swiper.swiper.activeIndex;
    const activeUser = this.allUserProfiles[activeIndex];
    // Here you can save or perform any actions with the active user's details
    console.log('Active User:', activeUser);
  }
}
