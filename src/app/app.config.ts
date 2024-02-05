
  import { ApplicationConfig, NgModule, importProvidersFrom } from '@angular/core';
  import { provideRouter, withViewTransitions } from '@angular/router';
  import { routes } from './app.routes';
  import { provideAnimations } from '@angular/platform-browser/animations';
  import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
  import { provideFirestore, getFirestore } from '@angular/fire/firestore';
  import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
  import { AngularFireModule } from '@angular/fire/compat';
  import { environment } from '../environment/environment.firebase';
  import { Component } from '@angular/core';

import { getAuth } from 'firebase/auth';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { getStorage, provideStorage } from '@angular/fire/storage';



export const appConfig: ApplicationConfig = {
  
    providers: [
      provideRouter(routes, withViewTransitions()),
      provideAnimations(),
      importProvidersFrom([
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage())
       ]),

      // provideRouter(routes),
      // provideHttpClient(),
      // provideClientHydration(),
      // importProvidersFrom([ provideFirebaseApp(() => initializeApp(environment.firebase)),
      //   provideFirestore(() => getFirestore()),]), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"vetigo-fc02e","appId":"1:255874786930:web:3d5b5ba47e7d20a63b84eb","databaseURL":"https://vetigo-fc02e-default-rtdb.asia-southeast1.firebasedatabase.app","storageBucket":"vetigo-fc02e.appspot.com","apiKey":"AIzaSyAkVjKQNGx19ZJxp-dUNuj7U8gVtTPVzTE","authDomain":"vetigo-fc02e.firebaseapp.com","messagingSenderId":"255874786930","measurementId":"G-6D8SCWYTHR"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"vetigo-fc02e","appId":"1:255874786930:web:3d5b5ba47e7d20a63b84eb","databaseURL":"https://vetigo-fc02e-default-rtdb.asia-southeast1.firebasedatabase.app","storageBucket":"vetigo-fc02e.appspot.com","apiKey":"AIzaSyAkVjKQNGx19ZJxp-dUNuj7U8gVtTPVzTE","authDomain":"vetigo-fc02e.firebaseapp.com","messagingSenderId":"255874786930","measurementId":"G-6D8SCWYTHR"}))), importProvidersFrom(provideStorage(() => getStorage()))
  //  ,
  //     importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
  //     // // If using Firestore specifically:
  //     importProvidersFrom(AngularFirestoreModule)
     
    ],
    
};

