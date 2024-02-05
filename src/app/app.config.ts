
  import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
  import { provideRouter, withViewTransitions } from '@angular/router';
  import { routes } from './app.routes';
  import { provideAnimations } from '@angular/platform-browser/animations';
  import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
  import { provideFirestore, getFirestore } from '@angular/fire/firestore';
  import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
  import { AngularFireModule } from '@angular/fire/compat';
  
  import { Component } from '@angular/core';
  // import { provideAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth as getAuth_alias, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment.development';



export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      // provideAnalytics(() => getAnalytics()),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      // provideFunctions(() => getFunctions()),
      // provideMessaging(() => getMessaging()),
      // providePerformance(() => getPerformance()),
      provideStorage(() => getStorage()),
    ]),
    
  ],
    
};

