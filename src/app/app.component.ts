import { Component, NgModule, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
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
import { VisibleService } from './visible.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,LoginComponent,HomeComponent,RouterLink,RouterLinkActive,NavbarComponent,MatButtonModule,MatIconButton,MatIconModule,
    SignupComponent,AboutusComponent,MatTabsModule,ForgetComponent,PdfComponent,UserprofileComponent,AngularFirestoreModule,MatDividerModule],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Vetigo';
  
  // constructor(private firestore:Firestore){

  // }
  // public ngOnInit(): void {
  //   const testCollection = collection(this.firestore, 'new');
  //   addDoc(testCollection,{text: "Vetigo"});
  // }
  constructor(private firestore : AngularFirestore){
   
}


}