import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';




export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp( {
      apiKey: "AIzaSyAkVjKQNGx19ZJxp-dUNuj7U8gVtTPVzTE",
      authDomain: "vetigo-fc02e.firebaseapp.com",
      databaseURL: "https://vetigo-fc02e-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "vetigo-fc02e",
      storageBucket: "vetigo-fc02e.appspot.com",
      messagingSenderId: "255874786930",
      appId: "1:255874786930:web:3d5b5ba47e7d20a63b84eb",
      measurementId: "G-6D8SCWYTHR"})),
      provideFirestore(() => getFirestore()),
    ]),
  ],
};