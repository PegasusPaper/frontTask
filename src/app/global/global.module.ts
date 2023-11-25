import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { KnobModule } from 'primeng/knob';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DataViewModule } from 'primeng/dataview';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  providers: [],

  imports: [CommonModule],
  exports: [
    CalendarModule,
    CheckboxModule,
    KnobModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    RouterModule,
    ReactiveFormsModule,
    PasswordModule,
    DataViewModule,
    TabMenuModule,
    TagModule,
    RatingModule,
    DialogModule,
    InputTextareaModule,
    AutoCompleteModule,
    DropdownModule,
  ],
})
export class GlobalModule {}
