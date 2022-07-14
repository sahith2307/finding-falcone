import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetSettingsComponent } from './planet-settings/planet-settings.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
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
  ],
})
export class ComponentsModule {}
