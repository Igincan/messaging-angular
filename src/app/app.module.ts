import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DatabaseComponent } from './database/database.component';
import { DatabasePeopleComponent } from './database/database-people/database-people.component';
import { DatabaseGroupsComponent } from './database/database-groups/database-groups.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddGroupDialogComponent } from './database/add-group-dialog/add-group-dialog.component';
import { AddPersonDialogComponent } from './database/add-person-dialog/add-person-dialog.component';
import { SendComponent } from './send/send.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatabaseComponent,
    DatabasePeopleComponent,
    DatabaseGroupsComponent,
    PageNotFoundComponent,
    AddGroupDialogComponent,
    AddPersonDialogComponent,
    SendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
