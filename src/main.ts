import { HammerModule, bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  register as registerSwiperElements
} from 'swiper/element/bundle';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


platformBrowserDynamic();


registerSwiperElements();
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
