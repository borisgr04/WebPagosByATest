import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonaRegistroComponent } from './pulsacion/persona-registro/persona-registro.component';
import { PersonaConsultaComponent } from './pulsacion/persona-consulta/persona-consulta.component';
import { PersonaRegistroReactiveComponent } from './pulsacion/persona-registro-reactive/persona-registro-reactive.component';
import { FiltroPersonaPipe } from './pipe/filtro-persona.pipe';
import { AlertModalComponent } from './@base/alert-modal/alert-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalErrorHandler, RollbarService, rollbarFactory, SentryErrorHandler } from './@base/global-error-handle-Error';


import { TerceroConsultaModalComponent } from './clientes/modals/tercero-consulta-modal/tercero-consulta-modal.component';
import { TerceroConsultaComponent } from './clientes/consulta/tercero-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PersonaRegistroComponent,
    PersonaConsultaComponent,
    PersonaRegistroReactiveComponent,
    FiltroPersonaPipe,
    AlertModalComponent,
    TerceroConsultaComponent,
    TerceroConsultaModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [AlertModalComponent, TerceroConsultaComponent,
    TerceroConsultaModalComponent],
  providers: [
    //{provide: ErrorHandler,useClass: GlobalErrorHandler  },
    //{provide: RollbarService, useFactory: rollbarFactory }
    { provide: ErrorHandler, useClass: SentryErrorHandler },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
