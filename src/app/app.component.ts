import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { SignupComponent } from './signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ForgetComponent } from './login/forget/forget.component';
import { PdfComponent } from './pdf/pdf.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {MatDividerModule} from '@angular/material/divider';
import { HomeComponent } from './home/home.component';
import {  Auth, User, user,authState  } from '@angular/fire/auth';
import { SwipeComponent } from './swipe/swipe.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,LoginComponent,HomeComponent,RouterLink,RouterLinkActive,MatButtonModule,MatIconButton,MatIconModule,
    SignupComponent,AboutusComponent,MatTabsModule,ForgetComponent,PdfComponent,UserprofileComponent,AngularFirestoreModule,MatDividerModule,SwipeComponent],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AppComponent {

  title = 'Vetigo';
  authState = authState(this.auth);
  userId: string | null = null;
  showprof: boolean = false;
  showdat: boolean = false;
  constructor(private firestore : AngularFirestore,private auth: Auth = inject(Auth),private router: Router){
   
  }
  
  ngOnInit(): void {
    
    this.authState.subscribe((user: User | null) => {
     //handle auth state changes here. Note, that user will be null if there is no currently logged in user.
     if (user) {
       this.userId = user.uid;
   this.showprof = !this.showprof;
   this.showdat = !this.showdat;
     
     }

 })
   
 }
 logout() {
  this.auth.signOut();
  this.router.navigate(['/login']);
  this.showprof = !this.showprof;
  this.showdat = !this.showdat;

}
swipe() {
 
  this.router.navigate(['/swipe']);
  
}


}


