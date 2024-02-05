
  import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { routes } from './app.routes';
  import { provideAnimations } from '@angular/platform-browser/animations';
  import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
  import { provideFirestore, getFirestore } from '@angular/fire/firestore';
  import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
  import { AngularFireModule } from '@angular/fire/compat';
  import { environment } from '../environment/environment.firebase';
  


export const appConfig: ApplicationConfig = {
  
    providers: [
      provideRouter(routes),
      provideAnimations(),
      importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
      // If using Firestore specifically:
      importProvidersFrom(AngularFirestoreModule)
      // provideFirebaseApp(() => initializeApp(environment.firebase)),
      // provideFirestore(() => getFirestore()),
    ],
    
};