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
import { LikedComponent } from './liked/liked.component';
import { ChatComponent } from './chat/chat.component';
import { ErrorComponent } from './error/error.component';

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
{path: 'profile', component: UserprofileComponent,canActivate: [AngularFireAuthGuard] },
{ path: 'swipe', component: SwipeComponent,canActivate: [AngularFireAuthGuard] },
{path: 'like', component: LikedComponent,canActivate: [AngularFireAuthGuard]},
{path: 'chat', component: ChatComponent,canActivate: [AngularFireAuthGuard]},
{ path: '**', component: ErrorComponent } // Wildcard route for any unmatched routes

];


