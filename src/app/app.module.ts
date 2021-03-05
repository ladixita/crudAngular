import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { TrabajadorComponent } from './trabajadores/trabajador/trabajador.component';
import { MaterialModule } from './material/material.module';
import { TrabajadorService } from './shared/trabajador.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { DepartmentService } from './shared/department.service';
import { DatePipe } from '@angular/common';
import { TrabajadorListComponent } from './trabajadores/trabajador-list/trabajador-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TrabajadoresComponent,
    TrabajadorComponent,
    TrabajadorListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [TrabajadorService, DepartmentService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [TrabajadorComponent]
})
export class AppModule { }
