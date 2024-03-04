import { Component, inject, CUSTOM_ELEMENTS_SCHEMA ,HostListener } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Database, onValue, ref } from '@angular/fire/database';
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
import * as Hammer from 'hammerjs';
import { IonicSlides } from '@ionic/angular/standalone';
import Swiper from 'swiper';
import { IonIcon, IonicModule } from '@ionic/angular';


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
    MatListModule, IonicModule
  ],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SwipeComponent {
  swiperModules = [IonicSlides];


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
  
startX :number =0;
endX :number =0;




  constructor(
    private auth: Auth = inject(Auth),
    private database: Database,
    private storage: AngularFireStorage,
    private router: Router
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
  touchStar(event: any){
    this.startX =event.touches[0].pageX;
  }
  touchMove(event: any,index: number){
    let deltX = this.startX -event.touches[0].pageX;
    let deg =deltX / 10;
    this.endX = event.touches[0].pageX;
    (<HTMLStyleElement>document.getElementById("card-"+index)).style.transform = "translateX("+ -deltX+ "px)rotate("+-deg+"deg)";
    if((this.endX -this.startX)<0){
      
      (<HTMLStyleElement>document.getElementById("x-button")).style.opacity = String(deltX/100);
         
    }
    else{
      (<HTMLStyleElement>document.getElementById("love-button")).style.opacity = String(deltX/100);

    }
  }
  touchEnd(index: number){
    if (this.endX > 0){ //to avoid removing card on click

    let finalX = this.endX -  this.startX;
    
    if (finalX > -100 && finalX < 100) { // reset card back to position
    
    (<HTMLStyleElement>document.getElementById("card-" + index)).style.transition = ".3s";
    
    (<HTMLStyleElement>document.getElementById("card-" + index)).style.transform ="translateX(@px) rotate(@deg)";
    
    // remove transition ofter 350 ms
    
    setTimeout(() => {
    
    (<HTMLStyleElement>document.getElementById("card-" + index)).style.transition = "0s";
    },350);
  }
  else if (finalX <= 100) { //Reject Card

    (<HTMLStyleElement>document.getElementById("card-" + index)).style.transition = "1s"; 
    
    (<HTMLStyleElement>document.getElementById("card-" + index)).style.transform = "translateX(-1000px) rotate(-360deg)";
    
    setTimeout(() => {
       
    this.allUserProfiles.splice(index, 1);
    
    
    }, 100);
    
    }
    
    else if (finalX >= 100){
     
        
        (<HTMLStyleElement>document.getElementById("card-" + index)).style.transition = "1s";
        
        (<HTMLStyleElement>document.getElementById("card-" + index)).style.transform = "translateX(1000px) rotate(30deg)";
        
    
        
        //remove user from users array
        
        setTimeout(() => {
        
 
        
        this.allUserProfiles.splice(index, 1);
        
 
        
        }, 100);
    } //Accept Card
}
this.startX = 0;
this.endX = 0;  
(<HTMLStyleElement>document.getElementById("x-button")).style.opacity = "0";
(<HTMLStyleElement>document.getElementById("love-button")).style.opacity = "0";

    
    
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
      });
  }



  onSwipeLeft() {
    // swiper: Reference to the Swiper instance
    // slideIndex: Index of the swiped slide
    // previousIndex: Index of the previous slide

  }
  // Handle swipe left action

  // Handle swipe right action
}
