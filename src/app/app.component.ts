import { Component } from '@angular/core';
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
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,LoginComponent,RouterLink,RouterLinkActive,NavbarComponent,MatButtonModule,MatIconButton,MatIconModule,
    SignupComponent,AboutusComponent,MatTabsModule,ForgetComponent,PdfComponent,UserprofileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Vetigo';
  showLogin = false;


}