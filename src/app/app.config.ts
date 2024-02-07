
  import { ApplicationConfig, importProvidersFrom } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { routes } from './app.routes';
  import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
  import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth , provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment.development';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';



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
      
    
     
    ]), provideAnimationsAsync(),
    
  ],
    
};

