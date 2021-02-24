import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModules } from './material-stuff';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForecastComponent } from './components/forecast/forecast.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ActionsComponent } from './components/actions/actions.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { TodoEntryComponent } from './components/todo-entry/todo-entry.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthEffects } from './effects/auth.effects';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { TodosDataService } from './services/todos-data.service';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    ForecastComponent,
    ProjectsComponent,
    ActionsComponent,
    InboxComponent,
    TodoEntryComponent,
    ListComponent,
    LoginComponent
  ],
  imports: [
    ...MaterialModules,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [
    AuthGuard,
    TodosDataService, {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
