import {bootstrapApplication} from '@angular/platform-browser';
import {importProvidersFrom} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";

import {AppRoutingModule} from "./app/app-routing.module";
import {AppComponent} from "./app";
import {appStore} from "./app/store";
import {UserEffect} from "./app/store/user";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule),
    provideHttpClient(),
    provideStore(appStore),
    provideEffects(UserEffect)
  ]
})
  .catch(err => console.error(err));
