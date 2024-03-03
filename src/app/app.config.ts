
  import { ApplicationConfig, importProvidersFrom } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { routes } from './app.routes';
  import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
  import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth , provideAuth } from '@angular/fire/auth';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireModule } from '@angular/fire/compat';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { environment } from '../environments/environment.development';
import { FormsModule } from '@angular/forms';


export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      // provideAnalytics(() => getAnalytics()),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      // provideFunctions(() => getFunctions()),
      // provideMessaging(() => getMessaging()),
      // providePerformance(() => getPerformance()),
      provideStorage(() => getStorage()),
      AngularFireModule.initializeApp(environment.firebaseConfig),
      
    
     
    ]), 
    provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"vetigo-fc02e","appId":"1:255874786930:web:3d5b5ba47e7d20a63b84eb","databaseURL":"https://vetigo-fc02e-default-rtdb.asia-southeast1.firebasedatabase.app","storageBucket":"vetigo-fc02e.appspot.com","apiKey":"AIzaSyAkVjKQNGx19ZJxp-dUNuj7U8gVtTPVzTE","authDomain":"vetigo-fc02e.firebaseapp.com","messagingSenderId":"255874786930","measurementId":"G-6D8SCWYTHR"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideMessaging(() => getMessaging())), importProvidersFrom(provideStorage(() => getStorage())), FormsModule
  ],
 
};  

