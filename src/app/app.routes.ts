import { Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ForgetComponent } from './login/forget/forget.component';
import { PdfComponent } from './pdf/pdf.component';
import { UserprofileComponent } from './userprofile/userprofile.component';


export const routes: Routes = [ { path: 'login', component: LoginComponent},
{ path: 'navbar', component: NavbarComponent},
{ path: 'main', component: AppComponent},
{path: 'home', component: HomeComponent},
{ path: 'signup', component: SignupComponent},
{ path: 'aboutus', component: AboutusComponent},
{ path: 'forget', component: ForgetComponent},
{ path: 'pdf', component: PdfComponent},
{ path: 'userprofile', component: UserprofileComponent },

];


