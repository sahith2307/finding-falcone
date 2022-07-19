import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PlanetSettingsComponent } from '../components/planet-settings/planet-settings.component';
import { MatRadioModule } from '@angular/material/radio';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [HomeComponent, PlanetSettingsComponent, ResultComponent],

  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatRadioModule,
  ],
})
export class PagesModule {}
