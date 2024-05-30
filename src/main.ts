import {bootstrapApplication} from '@angular/platform-browser';
import {importProvidersFrom} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {provideStore} from "@ngrx/store";

import {AppRoutingModule} from "./app/app-routing.module";
import {AppComponent} from "./app";
import {AppStore, store} from "./app/store";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule),
    provideHttpClient(),
    provideStore<AppStore>(store)
  ]
})
  .catch(err => console.error(err));
