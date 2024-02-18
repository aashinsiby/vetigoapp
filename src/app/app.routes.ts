import { Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ForgetComponent } from './login/forget/forget.component';
import { PdfComponent } from './pdf/pdf.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { SwipeComponent } from './swipe/swipe.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

export const routes: Routes = [ 
 {
  path:'', redirectTo: 'home', pathMatch:"full"
 },
 
 { path: 'login', component: LoginComponent},

{ path: 'main', component: AppComponent},
{path: 'home', component: HomeComponent},
{ path: 'signup', component: SignupComponent},
{ path: 'aboutus', component: AboutusComponent},
{ path: 'forget', component: ForgetComponent},
{ path: 'pdf', component: PdfComponent},
// {path: '**', component: HomeComponent},
{path: 'profile', component: UserprofileComponent,canActivate: [AngularFireAuthGuard] },
{ path: 'swipe', component: SwipeComponent,canActivate: [AngularFireAuthGuard] },

];


