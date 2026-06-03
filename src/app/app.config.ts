import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = { 
  projectId: "mi-portafolio-personal-8be84", 
  appId: "1:1011483030813:web:2d8eb919bd52a9690cddf4", 
  storageBucket: "mi-portafolio-personal-8be84.firebasestorage.app", 
  apiKey: "AIzaSyActXVrSqF2eJpxp41OzxsFA3KnvmJAA-k", 
  authDomain: "mi-portafolio-personal-8be84.firebaseapp.com", 
  messagingSenderId: "1011483030813"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})
    ), 

    provideHttpClient(),
    
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()) 
  ]
};
